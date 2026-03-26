import { Router } from 'express';
import { supabase, readDB, writeDB } from '../db.ts';
import { notifyAdmin, notifyTeam } from '../socket.ts';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Auth routes
router.post('/login', async (req, res) => {
  const { teamId, password } = req.body;
  try {
    const db = await readDB();
    const team = db.teams.find(t => t.team_id === teamId);

    if (!team) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (team.is_banned) {
      return res.status(403).json({ error: 'ACCESS_REVOKED: Security violation detected. Node permanently disabled.' });
    }

    const isValid = await bcrypt.compare(password, team.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ teamId: team.team_id, role: 'team' }, JWT_SECRET);
    res.json({ token, teamName: team.team_name, teamId: team.team_id });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/team/violation', async (req, res) => {
  const { teamId, type, token: bodyToken } = req.body;
  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.split(' ')[1] : bodyToken;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const db = await readDB();
  const team = db.teams.find(t => t.team_id === teamId);
  
  if (team) {
    team.is_banned = true;
    if (supabase) {
      await supabase.from('teams').update({ is_banned: true }).eq('team_id', teamId);
    } else {
      await writeDB(db);
    }

    notifyAdmin('new_event', {
      id: Date.now().toString(),
      type: 'error',
      message: `SECURITY_ALERT: Team ${teamId} triggered violation [${type}]. Node BANNED.`,
      timestamp: Date.now()
    });
  }
  res.json({ success: true });
});

router.post('/team/ban', async (req, res) => {
  const { teamId, token: bodyToken } = req.body;
  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.split(' ')[1] : bodyToken;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const db = await readDB();
  const team = db.teams.find(t => t.team_id === teamId);
  
  if (team) {
    team.is_banned = true;
    if (supabase) {
      await supabase.from('teams').update({ is_banned: true }).eq('team_id', teamId);
    } else {
      await writeDB(db);
    }

    notifyAdmin('new_event', {
      id: Date.now().toString(),
      type: 'error',
      message: `SECURITY_ALERT: Team ${teamId} attempted tab switch/exit. Node BANNED.`,
      timestamp: Date.now()
    });
  }
  res.json({ success: true });
});

router.post('/admin/login', async (req, res) => {
  const { password } = req.body;
  if (password === (process.env.ADMIN_PASSWORD || 'admin123')) {
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET);
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Admin routes
router.get('/admin/teams', async (req, res) => {
  const db = await readDB();
  const teamsWithStats = db.teams.map(team => {
    const activeAssignment = db.assignments.find(a => a.team_id === team.team_id && a.status === 'active');
    const teamSubmissions = db.submissions.filter(s => s.team_id === team.team_id);
    const solvedCount = teamSubmissions.filter(s => s.result === 'correct').length;
    const incorrectCount = teamSubmissions.filter(s => s.result === 'incorrect').length;
    const lifeline = db.lifelines.find(l => l.team_id === team.team_id) || { lifeline_remaining: 3, lifeline_used: 0 };

    return {
      ...team,
      current_puzzle_id: activeAssignment?.puzzle_id || 'NONE',
      solved_count: solvedCount,
      incorrect_count: incorrectCount,
      lifeline_remaining: lifeline.lifeline_remaining
    };
  });
  res.json(teamsWithStats);
});

router.post('/admin/register-team', async (req, res) => {
  const { teamId, teamName, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  
  const db = await readDB();
  if (db.teams.some(t => t.team_id === teamId)) {
    return res.status(400).json({ error: 'Team ID already exists' });
  }

  const newTeam = { team_id: teamId, team_name: teamName, password_hash: passwordHash, is_banned: false, points: 0 };
  db.teams.push(newTeam);
  
  if (supabase) {
    await supabase.from('teams').insert([newTeam]);
  } else {
    await writeDB(db);
  }

  res.json({ message: 'Team registered successfully' });
});

router.post('/admin/unban', async (req, res) => {
  const { teamId } = req.body;
  const db = await readDB();
  const team = db.teams.find(t => t.team_id === teamId);
  
  if (team) {
    team.is_banned = false;
    if (supabase) {
      await supabase.from('teams').update({ is_banned: false }).eq('team_id', teamId);
    } else {
      await writeDB(db);
    }

    notifyAdmin('new_event', {
      id: Date.now().toString(),
      type: 'success',
      message: `SECURITY_UPDATE: Team ${teamId} has been UNBANNED. Node access restored.`,
      timestamp: Date.now()
    });
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Team not found' });
  }
});

router.post('/admin/team/timer-action', async (req, res) => {
  const { teamId, action } = req.body;
  const db = await readDB();
  const team = db.teams.find(t => t.team_id === teamId);
  
  if (!team) return res.status(404).json({ error: 'Team not found' });

  if (action === 'pause') {
    if (!team.session_paused_at) {
      team.session_paused_at = Date.now();
    }
  } else if (action === 'resume') {
    if (team.session_paused_at) {
      const pausedFor = Date.now() - team.session_paused_at;
      team.paused_duration = (team.paused_duration || 0) + pausedFor;
      team.session_paused_at = null;
    }
  } else if (action === 'reset') {
    const firstAssignment = db.assignments
      .filter(a => a.team_id === teamId)
      .sort((a, b) => a.start_time - b.start_time)[0];
    
    if (firstAssignment) {
      firstAssignment.start_time = Date.now();
    }
    team.paused_duration = 0;
    team.session_paused_at = null;
  }

  if (supabase) {
    await supabase.from('teams').update({ 
      session_paused_at: team.session_paused_at,
      paused_duration: team.paused_duration 
    }).eq('team_id', teamId);
    
    if (action === 'reset') {
      const firstAssignment = db.assignments
        .filter(a => a.team_id === teamId)
        .sort((a, b) => a.start_time - b.start_time)[0];
      if (firstAssignment) {
        await supabase.from('assignments').update({ start_time: firstAssignment.start_time }).eq('team_id', teamId).eq('puzzle_id', firstAssignment.puzzle_id);
      }
    }
  } else {
    await writeDB(db);
  }

  notifyAdmin('new_event', {
    id: Date.now().toString(),
    type: 'info',
    message: `TIMER_ACTION: Team ${teamId} timer ${action.toUpperCase()}D.`,
    timestamp: Date.now()
  });

  res.json({ success: true });
});

router.post('/admin/sync-puzzles', async (req, res) => {
  try {
    const puzzleBankPath = path.join(__dirname, '..', 'puzzle_bank');
    const folders = await fs.readdir(puzzleBankPath);
    const puzzles = [];

    for (const folder of folders) {
      const folderPath = path.join(puzzleBankPath, folder);
      if ((await fs.stat(folderPath)).isDirectory()) {
        const readmeMdPath = path.join(folderPath, 'README.md');
        const readmeTxtPath = path.join(folderPath, 'README.txt');
        const solutionPath = path.join(folderPath, 'solution.txt');
        
        let text = '';
        if (await fs.pathExists(readmeMdPath)) {
          text = await fs.readFile(readmeMdPath, 'utf-8');
        } else if (await fs.pathExists(readmeTxtPath)) {
          text = await fs.readFile(readmeTxtPath, 'utf-8');
        }

        if (text) {
          let answer = 'password'; // Default for preview
          if (await fs.pathExists(solutionPath)) {
            answer = (await fs.readFile(solutionPath, 'utf-8')).trim();
          }
          
          puzzles.push({
            puzzle_id: folder,
            puzzle_text: text,
            correct_answer: answer,
            reference_type: 'text'
          });
        }
      }
    }

    const db = await readDB();
    db.puzzles = puzzles;

    if (supabase) {
      // Clear and re-insert
      await supabase.from('puzzles').delete().neq('puzzle_id', 'none');
      if (puzzles.length > 0) {
        await supabase.from('puzzles').insert(puzzles);
      }
    } else {
      await writeDB(db);
    }

    res.json({ message: `Synced ${puzzles.length} puzzles` });
  } catch (err) {
    console.error('Sync error:', err);
    res.status(500).json({ error: 'Sync failed' });
  }
});

// Puzzle routes
router.get('/team/status', async (req, res) => {
  const { teamId } = req.query;
  const db = await readDB();
  
  let assignment = db.assignments.find(a => a.team_id === teamId && a.status === 'active');
  
  if (!assignment) {
    // Assign a random puzzle if none active
    const solvedIds = db.submissions
      .filter(s => s.team_id === teamId && s.result === 'correct')
      .map(s => s.puzzle_id);
    
    const availablePuzzles = db.puzzles.filter(p => !solvedIds.includes(p.puzzle_id));
    
    if (availablePuzzles.length > 0) {
      const randomIndex = Math.floor(Math.random() * availablePuzzles.length);
      const nextPuzzle = availablePuzzles[randomIndex];
      
      assignment = {
        team_id: teamId as string,
        puzzle_id: nextPuzzle.puzzle_id,
        start_time: Date.now(),
        status: 'active'
      };
      db.assignments.push(assignment);
      if (supabase) {
        await supabase.from('assignments').insert([assignment]);
      } else {
        await writeDB(db);
      }
    }
  }

  const puzzle = assignment ? db.puzzles.find(p => p.puzzle_id === assignment!.puzzle_id) : null;
  
  const teamSubmissions = db.submissions.filter(s => s.team_id === teamId);
  const solvedCount = teamSubmissions.filter(s => s.result === 'correct').length;
  const attemptCount = teamSubmissions.length;
  const lifeline = db.lifelines.find(l => l.team_id === teamId) || { lifeline_remaining: 3, lifeline_used: 0 };

  const team = db.teams.find(t => t.team_id === teamId);
  const firstAssignment = db.assignments
    .filter(a => a.team_id === teamId)
    .sort((a, b) => a.start_time - b.start_time)[0];
  
  let sessionEndTime = firstAssignment ? firstAssignment.start_time + (60 * 60 * 1000) + (team?.paused_duration || 0) : null;
  const isPaused = !!team?.session_paused_at;

  res.json({ 
    puzzle, 
    assignment,
    stats: {
      solved: solvedCount,
      attempts: attemptCount
    },
    lifeline,
    sessionEndTime,
    isPaused,
    pausedAt: team?.session_paused_at,
    points: team?.points || 0
  });
});

router.post('/skip', async (req, res) => {
  const { teamId, puzzleId } = req.body;
  const db = await readDB();
  
  const assignment = db.assignments.find(a => a.team_id === teamId && a.puzzle_id === puzzleId && a.status === 'active');
  if (assignment) {
    assignment.status = 'expired'; // Mark as skipped/expired
    
    if (supabase) {
      await supabase.from('assignments').update({ status: 'expired' }).eq('team_id', teamId).eq('puzzle_id', puzzleId);
    } else {
      await writeDB(db);
    }

    notifyAdmin('new_event', {
      id: Date.now().toString(),
      type: 'error',
      message: `Team ${teamId} SKIPPED puzzle ${puzzleId}`,
      timestamp: Date.now()
    });

    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Active assignment not found' });
  }
});

router.post('/submit', async (req, res) => {
  const { teamId, puzzleId, answer } = req.body;
  const db = await readDB();
  
  const puzzle = db.puzzles.find(p => p.puzzle_id === puzzleId);
  if (!puzzle) return res.status(404).json({ error: 'Puzzle not found' });

  const isCorrect = puzzle.correct_answer.toLowerCase() === answer.toLowerCase();
  
  const submission = {
    team_id: teamId,
    puzzle_id: puzzleId,
    answer_submitted: answer,
    timestamp: Date.now(),
    result: isCorrect ? 'correct' : 'incorrect' as any
  };

  db.submissions.push(submission);

  if (isCorrect) {
    const assignment = db.assignments.find(a => a.team_id === teamId && a.puzzle_id === puzzleId && a.status === 'active');
    if (assignment) assignment.status = 'completed';
    
    const team = db.teams.find(t => t.team_id === teamId);
    if (team) {
      team.points = (team.points || 0) + 1;
    }

    if (supabase) {
      await supabase.from('assignments').update({ status: 'completed' }).eq('team_id', teamId).eq('puzzle_id', puzzleId);
      if (team) {
        await supabase.from('teams').update({ points: team.points }).eq('team_id', teamId);
      }
    }
  }

  if (supabase) {
    await supabase.from('submissions').insert([submission]);
  } else {
    await writeDB(db);
  }

  notifyAdmin('new_event', {
    id: Date.now().toString(),
    type: 'submission',
    message: `Team ${teamId} submitted ${isCorrect ? 'CORRECT' : 'INCORRECT'} answer for ${puzzleId}`,
    timestamp: Date.now()
  });

  res.json({ result: submission.result });
});

router.post('/lifeline/use', async (req, res) => {
  const { teamId } = req.body;
  const db = await readDB();
  
  let lifeline = db.lifelines.find(l => l.team_id === teamId);
  if (!lifeline) {
    lifeline = { team_id: teamId, lifeline_remaining: 3, lifeline_used: 0 };
    db.lifelines.push(lifeline);
  }

  if (lifeline.lifeline_remaining > 0) {
    lifeline.lifeline_remaining -= 1;
    lifeline.lifeline_used += 1;
    
    if (supabase) {
      await supabase.from('lifelines').upsert([lifeline]);
    } else {
      await writeDB(db);
    }

    notifyAdmin('new_event', {
      id: Date.now().toString(),
      type: 'info',
      message: `Team ${teamId} ACTIVATED a lifeline. Grace period initiated.`,
      timestamp: Date.now()
    });

    res.json({ success: true, lifeline });
  } else {
    res.status(400).json({ error: 'No lifelines remaining' });
  }
});

export default router;
