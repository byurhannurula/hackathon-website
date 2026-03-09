-- ============================================================
-- RUSE AI HACK '26 — Full Supabase schema (fresh init)
-- Run this in Supabase SQL Editor after resetting the project.
-- ============================================================

-- Sequence for auto-incrementing ticket numbers
CREATE SEQUENCE IF NOT EXISTS ticket_number_seq START WITH 1;

-- Main registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Step 1: Personal & Professional Info
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  role TEXT NOT NULL,
  organization TEXT NOT NULL,
  dev_experience TEXT NOT NULL,

  -- Step 2: AI & Motivation
  ai_experience TEXT NOT NULL,
  ai_tools TEXT NOT NULL,
  motivation TEXT NOT NULL,
  expectations TEXT NOT NULL,

  -- Step 3: Project & Participation
  has_theme TEXT NOT NULL,
  theme_description TEXT,
  want_challenge TEXT NOT NULL,
  volunteer_help TEXT NOT NULL,
  agree_random_teams BOOLEAN NOT NULL DEFAULT false,
  gdpr_consent BOOLEAN NOT NULL DEFAULT false,
  additional_questions TEXT,

  -- Ticket info
  ticket_id UUID UNIQUE NOT NULL DEFAULT gen_random_uuid(),
  ticket_number INTEGER UNIQUE NOT NULL DEFAULT nextval('ticket_number_seq'),
  github_handle TEXT,
  avatar_url TEXT,

  -- Metadata
  registration_status TEXT DEFAULT 'pending',
  notes TEXT
);

-- ── Indexes ──────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_ticket_id ON registrations(ticket_id);
CREATE INDEX IF NOT EXISTS idx_registrations_ticket_number ON registrations(ticket_number);
CREATE INDEX IF NOT EXISTS idx_registrations_created ON registrations(created_at DESC);

-- ── Row Level Security ───────────────────────────────────────
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to register (insert)
CREATE POLICY "Allow public registration" ON registrations
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to look up a ticket by ticket_id (public share links)
-- Only exposes limited columns via the app's select queries
CREATE POLICY "Allow public ticket lookup" ON registrations
  FOR SELECT
  USING (true);

-- Allow service role to do everything (admin)
CREATE POLICY "Allow service role full access" ON registrations
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ── Registration count function ──────────────────────────────
CREATE OR REPLACE FUNCTION get_registration_count()
RETURNS INTEGER AS $$
  SELECT COUNT(*)::INTEGER FROM registrations;
$$ LANGUAGE SQL STABLE;

GRANT EXECUTE ON FUNCTION get_registration_count() TO anon, authenticated;

ALTER SEQUENCE ticket_number_seq RESTART WITH 1;
