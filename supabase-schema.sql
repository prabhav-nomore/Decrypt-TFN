-- Run this in your Supabase SQL Editor

-- Teams Table
CREATE TABLE teams (
  team_id TEXT PRIMARY KEY,
  team_name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  is_banned BOOLEAN DEFAULT FALSE,
  session_paused_at BIGINT,
  paused_duration BIGINT DEFAULT 0,
  points INTEGER DEFAULT 0,
  violation_count INTEGER DEFAULT 0
);

-- Puzzles Table
CREATE TABLE puzzles (
  puzzle_id TEXT PRIMARY KEY,
  puzzle_text TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  reference_type TEXT NOT NULL,
  isolated_url TEXT
);

-- Assignments Table
CREATE TABLE assignments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id TEXT REFERENCES teams(team_id) ON DELETE CASCADE,
  puzzle_id TEXT REFERENCES puzzles(puzzle_id) ON DELETE CASCADE,
  start_time BIGINT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'completed', 'expired'))
);

-- Submissions Table
CREATE TABLE submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id TEXT REFERENCES teams(team_id) ON DELETE CASCADE,
  puzzle_id TEXT REFERENCES puzzles(puzzle_id) ON DELETE CASCADE,
  answer_submitted TEXT NOT NULL,
  timestamp BIGINT NOT NULL,
  result TEXT NOT NULL CHECK (result IN ('correct', 'incorrect'))
);

-- Lifelines Table
CREATE TABLE lifelines (
  team_id TEXT PRIMARY KEY REFERENCES teams(team_id) ON DELETE CASCADE,
  lifeline_remaining INTEGER DEFAULT 3,
  lifeline_used INTEGER DEFAULT 0
);

-- Notepads Table
CREATE TABLE notepads (
  team_id TEXT PRIMARY KEY REFERENCES teams(team_id) ON DELETE CASCADE,
  content TEXT DEFAULT '',
  updated_at BIGINT NOT NULL
);
