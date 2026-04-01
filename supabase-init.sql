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
  age TEXT,
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
  has_team TEXT NOT NULL DEFAULT 'Не',
  team_name TEXT,
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

  -- Metadata (admin-only — defaults enforced, anon cannot set these)
  registration_status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT,
  status_updated_at TIMESTAMPTZ
);

-- ── Indexes ──────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_ticket_id ON registrations(ticket_id);
CREATE INDEX IF NOT EXISTS idx_registrations_ticket_number ON registrations(ticket_number);
CREATE INDEX IF NOT EXISTS idx_registrations_created ON registrations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_registrations_status ON registrations(registration_status);

-- ── Row Level Security ───────────────────────────────────────
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Anon can INSERT registration data only.
-- They CANNOT read, update, or delete any rows.
-- Columns like registration_status, notes, status_updated_at use
-- database defaults and cannot be overridden via the anon INSERT
-- because the API route (which uses service_role) controls which
-- columns are sent. Direct anon inserts via the Supabase client
-- would still rely on DB defaults for those columns.
CREATE POLICY "Allow public registration" ON registrations
  FOR INSERT
  WITH CHECK (
    -- Ensure anon cannot self-approve or inject metadata
    registration_status = 'pending'
    AND notes IS NULL
    AND status_updated_at IS NULL
  );

-- No public SELECT — all reads go through the service role key
-- in API routes, which bypasses RLS entirely.
-- This prevents anyone with the anon key from dumping the table.

-- No public UPDATE or DELETE.

-- Service role can do everything (used by API routes)
CREATE POLICY "Allow service role full access" ON registrations
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ── Registration count function ──────────────────────────────
-- Returns only the count, no personal data exposed.
CREATE OR REPLACE FUNCTION get_registration_count()
RETURNS INTEGER AS $$
  SELECT COUNT(*)::INTEGER FROM registrations;
$$ LANGUAGE SQL STABLE;

GRANT EXECUTE ON FUNCTION get_registration_count() TO anon, authenticated;

ALTER SEQUENCE ticket_number_seq RESTART WITH 1;

-- ── Site Settings (key-value store) ─────────────────────────
-- Lightweight table for admin-toggleable settings (e.g. registration_open).
-- Only service_role can read/write. No public access.
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role only" ON site_settings
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Default: registration is open
INSERT INTO site_settings (key, value) VALUES ('registration_open', 'true')
  ON CONFLICT (key) DO NOTHING;
