-- Drop existing table if you want to start fresh (CAUTION: This deletes all data!)
-- DROP TABLE IF EXISTS registrations;

-- Create sequence for ticket numbers starting at 1
-- If the sequence already exists, reset it with: ALTER SEQUENCE ticket_number_seq RESTART WITH 1;
CREATE SEQUENCE IF NOT EXISTS ticket_number_seq START WITH 1;

-- Create updated registrations table with all new fields
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
  additional_questions TEXT,
  
  -- Ticket info
  ticket_number INTEGER UNIQUE DEFAULT nextval('ticket_number_seq'),
  github_handle TEXT,
  avatar_url TEXT,
  
  -- Metadata
  registration_status TEXT DEFAULT 'pending',
  notes TEXT
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);

-- Create index on ticket_number
CREATE INDEX IF NOT EXISTS idx_registrations_ticket ON registrations(ticket_number);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_registrations_created ON registrations(created_at DESC);

-- Enable Row Level Security
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert (register)
CREATE POLICY "Allow public registration" ON registrations
  FOR INSERT
  WITH CHECK (true);

-- Policy: Allow service role to read all
CREATE POLICY "Allow service role to read all" ON registrations
  FOR SELECT
  USING (auth.role() = 'service_role');

-- Policy: Allow service role to update
CREATE POLICY "Allow service role to update" ON registrations
  FOR UPDATE
  USING (auth.role() = 'service_role');

-- Function to get registration count
CREATE OR REPLACE FUNCTION get_registration_count()
RETURNS INTEGER AS $$
  SELECT COUNT(*)::INTEGER FROM registrations;
$$ LANGUAGE SQL STABLE;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION get_registration_count() TO anon, authenticated;
