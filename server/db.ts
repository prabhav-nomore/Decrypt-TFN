import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'data', 'db.json');

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const supabase = supabaseUrl ? createClient(supabaseUrl, supabaseKey) : null;

export interface Team {
  team_id: string;
  team_name: string;
  password_hash: string;
  is_banned?: boolean;
  session_paused_at?: number | null;
  paused_duration?: number;
  points?: number;
}

export interface Puzzle {
  puzzle_id: string;
  puzzle_text: string;
  correct_answer: string;
  reference_type: 'python' | 'javascript' | 'text';
}

export interface Assignment {
  id?: string;
  team_id: string;
  puzzle_id: string;
  start_time: number;
  status: 'active' | 'completed' | 'expired';
}

export interface Submission {
  id?: string;
  team_id: string;
  puzzle_id: string;
  answer_submitted: string;
  timestamp: number;
  result: 'correct' | 'incorrect';
}

export interface Lifeline {
  team_id: string;
  lifeline_remaining: number;
  lifeline_used: number;
}

export interface Notepad {
  team_id: string;
  content: string;
  updated_at: number;
}

export interface Database {
  teams: Team[];
  puzzles: Puzzle[];
  assignments: Assignment[];
  submissions: Submission[];
  lifelines: Lifeline[];
  notepads: Notepad[];
}

const DEFAULT_DB: Database = {
  teams: [
    {
      team_id: 'TEAM01',
      team_name: 'Alpha Team',
      password_hash: bcrypt.hashSync('password', 10),
      is_banned: false,
      points: 0
    }
  ],
  puzzles: [],
  assignments: [],
  submissions: [],
  lifelines: [],
  notepads: []
};

export async function readDB(): Promise<Database> {
  if (supabase) {
    const [
      { data: teams },
      { data: puzzles },
      { data: assignments },
      { data: submissions },
      { data: lifelines },
      { data: notepads }
    ] = await Promise.all([
      supabase.from('teams').select('*'),
      supabase.from('puzzles').select('*'),
      supabase.from('assignments').select('*'),
      supabase.from('submissions').select('*'),
      supabase.from('lifelines').select('*'),
      supabase.from('notepads').select('*')
    ]);

    return {
      teams: teams || [],
      puzzles: puzzles || [],
      assignments: assignments || [],
      submissions: submissions || [],
      lifelines: lifelines || [],
      notepads: notepads || []
    };
  } else {
    // Local JSON fallback
    if (!(await fs.pathExists(DB_PATH))) {
      await fs.ensureDir(path.dirname(DB_PATH));
      await fs.writeJson(DB_PATH, DEFAULT_DB, { spaces: 2 });
      return DEFAULT_DB;
    }
    return await fs.readJson(DB_PATH);
  }
}

export async function writeDB(data: Database): Promise<void> {
  if (supabase) {
    // Naive implementation for Supabase - in real app, update specific rows
    console.warn('writeDB called with Supabase. Refactor to use direct updates.');
  } else {
    await fs.writeJson(DB_PATH, data, { spaces: 2 });
  }
}
