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

const isAdmin = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    if (decoded.role === 'admin') {
      next();
    } else {
      res.status(403).json({ error: 'Forbidden: Admin access required' });
    }
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

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
    team.violation_count = (team.violation_count || 0) + 1;
    const isBanned = team.violation_count >= 3;
    
    if (isBanned) {
      team.is_banned = true;
    }

    if (supabase) {
      await supabase.from('teams').update({ 
        violation_count: team.violation_count,
        is_banned: team.is_banned 
      }).eq('team_id', teamId);
    } else {
      await writeDB(db);
    }

    notifyAdmin('new_event', {
      id: Date.now().toString(),
      type: isBanned ? 'error' : 'warning',
      message: `SECURITY_ALERT: Team ${teamId} triggered violation [${type}]. Count: ${team.violation_count}/3. ${isBanned ? 'Node BANNED.' : 'Warning issued.'}`,
      timestamp: Date.now()
    });

    return res.json({ 
      success: true, 
      isBanned, 
      violationCount: team.violation_count 
    });
  }
  res.json({ success: false, error: 'Team not found' });
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
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return res.status(500).json({ error: 'ADMIN_PASSWORD environment variable is not set' });
  }

  if (password === adminPassword) {
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET);
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Admin routes
router.get('/admin/teams', isAdmin, async (req, res) => {
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

router.post('/admin/register-team', isAdmin, async (req, res) => {
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

router.post('/admin/unban', isAdmin, async (req, res) => {
  const { teamId } = req.body;
  const db = await readDB();
  const team = db.teams.find(t => t.team_id === teamId);
  
  if (team) {
    team.is_banned = false;
    team.violation_count = 0;
    if (supabase) {
      await supabase.from('teams').update({ 
        is_banned: false,
        violation_count: 0
      }).eq('team_id', teamId);
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

router.post('/admin/team/timer-action', isAdmin, async (req, res) => {
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

router.post('/admin/sync-puzzles', isAdmin, async (req, res) => {
  try {
    const puzzleBankPath = path.join(__dirname, '..', 'puzzle_bank');
    let puzzles: any[] = [];
    async function scanDir(dir: string) {
      const entries = await fs.readdir(dir);
      for (const entry of entries) {
        const fullPath = path.join(dir, entry);
        const stat = await fs.stat(fullPath);
        if (stat.isDirectory()) {
          const readmeMdPath = path.join(fullPath, 'README.md');
          const readmeTxtPath = path.join(fullPath, 'README.txt');
          const solutionPath = path.join(fullPath, 'solution.txt');
          const organizerSolutionPath = path.join(fullPath, 'organizer_solution.txt');
          const solutionsTxtPath = path.join(fullPath, 'solutions.txt');
          const verifierPath = path.join(fullPath, 'verifier.py');
          const verifierAutoPath = path.join(fullPath, 'verifier_auto.py');
          
          let text = '';
          if (await fs.pathExists(readmeMdPath)) {
            text = await fs.readFile(readmeMdPath, 'utf-8');
          } else if (await fs.pathExists(readmeTxtPath)) {
            text = await fs.readFile(readmeTxtPath, 'utf-8');
          }

          if (text && text.length > 50) { // Avoid adding empty or very short placeholder READMEs
            let answer = 'password'; // Default for preview
            
            // Try to find the answer in various files
            if (await fs.pathExists(solutionPath)) {
              answer = (await fs.readFile(solutionPath, 'utf-8')).trim();
            } else if (await fs.pathExists(organizerSolutionPath)) {
              answer = (await fs.readFile(organizerSolutionPath, 'utf-8')).trim();
            } else if (await fs.pathExists(solutionsTxtPath)) {
              answer = (await fs.readFile(solutionsTxtPath, 'utf-8')).trim();
            } else if (await fs.pathExists(verifierPath)) {
              const verifierContent = await fs.readFile(verifierPath, 'utf-8');
              const match = verifierContent.match(/SECRET\s*=\s*["']([^"']+)["']/);
              if (match) {
                answer = match[1];
              }
            } else if (await fs.pathExists(verifierAutoPath)) {
               const verifierContent = await fs.readFile(verifierAutoPath, 'utf-8');
               const match = verifierContent.match(/correct_moves\s*=\s*\[([^\]]+)\]/);
               if (match) {
                 answer = match[1].replace(/['"\s]/g, '');
               }
            }
            
            let type = 'Mixed / Meta';
            let isolatedUrl = null;
            const lowerDir = entry.toLowerCase();
            const fullLowerPath = fullPath.toLowerCase();
            
            if (fullLowerPath.includes('cipher') || fullLowerPath.includes('caesar') || fullLowerPath.includes('morse')) type = 'Cryptography';
            else if (fullLowerPath.includes('steg')) type = 'Steganography';
            else if (fullLowerPath.includes('code') || fullLowerPath.includes('debug')) type = 'Code Debugging';
            else if (fullLowerPath.includes('math') || fullLowerPath.includes('numeric')) type = 'Number Theory';
            else if (fullLowerPath.includes('network')) type = 'Networking';
            else if (fullLowerPath.includes('logic')) type = 'Logic / Patterns';
            else if (fullLowerPath.includes('osint')) type = 'OSINT';
            else if (fullLowerPath.includes('forensic')) type = 'Forensics';
            else if (fullLowerPath.includes('audio')) type = 'Audio / Spectrogram';
            else if (fullLowerPath.includes('binary') || lowerDir.includes('bitwise')) type = 'Binary / Bitwise';
            else if (fullLowerPath.includes('maze')) type = 'Maze / Pathfinding';
            
            const puzzleId = path.relative(puzzleBankPath, fullPath).replace(/\\/g, '/');

            // Detect HTML Inspection
            const indexHtmlPath = path.join(fullPath, 'index.html');
            if (await fs.pathExists(indexHtmlPath)) {
              type = 'HTML Inspection';
              isolatedUrl = `/puzzles/${puzzleId}/index.html`;
            }

            // Only add if it's likely a real puzzle (has an answer or is a leaf node)
            // We'll be generous and add it if it has text, but we'll always recurse
            puzzles.push({
              puzzle_id: puzzleId,
              puzzle_text: text,
              correct_answer: answer,
              reference_type: type,
              isolated_url: isolatedUrl
            });
          }
          
          // ALWAYS recurse to find sub-puzzles, even if this folder had a README
          await scanDir(fullPath);
        }
      }
    }

    await scanDir(puzzleBankPath);
    console.log(`Identified ${puzzles.length} puzzles in puzzle_bank`);
    
    // Ensure uniqueness of puzzle_id
    const uniquePuzzles = [];
    const seenIds = new Set();
    for (const p of puzzles) {
      if (!seenIds.has(p.puzzle_id)) {
        seenIds.add(p.puzzle_id);
        uniquePuzzles.push(p);
      }
    }
    puzzles = uniquePuzzles;
    console.log(`After deduplication: ${puzzles.length} puzzles`);

    const db = await readDB();
    db.puzzles = puzzles;

    if (supabase) {
      // Clear and re-insert
      const { error: deleteError } = await supabase.from('puzzles').delete().neq('puzzle_id', 'none');
      if (deleteError) {
        console.error('Error clearing puzzles:', deleteError);
        return res.status(500).json({ error: 'Failed to clear existing puzzles', details: deleteError });
      }

      if (puzzles.length > 0) {
        // Insert in chunks of 50 to avoid payload limits
        const chunkSize = 50;
        for (let i = 0; i < puzzles.length; i += chunkSize) {
          const chunk = puzzles.slice(i, i + chunkSize);
          const { error: insertError } = await supabase.from('puzzles').insert(chunk);
          if (insertError) {
            console.error(`Error inserting puzzle chunk ${i / chunkSize}:`, insertError);
            return res.status(500).json({ 
              error: `Failed to insert puzzles at chunk ${i / chunkSize}.`, 
              details: JSON.stringify(insertError, null, 2)
            });
          }
        }
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

// Notepad routes
router.get('/team/notepad', async (req, res) => {
  const { teamId } = req.query;
  const db = await readDB();
  const notepad = db.notepads?.find(n => n.team_id === teamId) || { team_id: teamId, content: '', updated_at: Date.now() };
  res.json(notepad);
});

router.post('/team/notepad', async (req, res) => {
  const { teamId, content } = req.body;
  const db = await readDB();
  if (!db.notepads) db.notepads = [];
  
  let notepad = db.notepads.find(n => n.team_id === teamId);
  if (notepad) {
    notepad.content = content;
    notepad.updated_at = Date.now();
  } else {
    notepad = { team_id: teamId, content, updated_at: Date.now() };
    db.notepads.push(notepad);
  }

  if (supabase) {
    await supabase.from('notepads').upsert([notepad]);
  } else {
    await writeDB(db);
  }
  res.json({ success: true });
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

router.get('/team/puzzle-files', async (req, res) => {
  const { puzzleId } = req.query;
  if (!puzzleId) return res.status(400).json({ error: 'Missing puzzleId' });

  try {
    const puzzleBankPath = path.join(__dirname, '..', 'puzzle_bank');
    const targetPath = path.join(puzzleBankPath, puzzleId as string);
    
    // Ensure the path is within puzzle_bank to prevent directory traversal
    if (!targetPath.startsWith(puzzleBankPath)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    if (!await fs.pathExists(targetPath)) {
      return res.status(404).json({ error: 'Puzzle directory not found' });
    }

    const entries = await fs.readdir(targetPath);
    const files = [];
    for (const entry of entries) {
      const fullPath = path.join(targetPath, entry);
      const stat = await fs.stat(fullPath);
      if (stat.isFile()) {
        const lowerEntry = entry.toLowerCase();
        const isSensitive = 
          lowerEntry.includes('solution') || 
          lowerEntry.includes('answer') || 
          lowerEntry.includes('verifier') || 
          lowerEntry.includes('organizer') || 
          lowerEntry.includes('reference') ||
          lowerEntry.includes('plaintext');

        if (!isSensitive) {
          const relativePath = path.relative(puzzleBankPath, fullPath).replace(/\\/g, '/');
          files.push({
            name: entry,
            url: `/puzzles/${relativePath}`,
            size: stat.size
          });
        }
      }
    }
    res.json(files);
  } catch (err) {
    console.error('Error listing files:', err);
    res.status(500).json({ error: 'Failed to list files' });
  }
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
