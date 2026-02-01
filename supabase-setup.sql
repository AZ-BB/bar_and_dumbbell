-- Bar & Dumbbell Gym - Leads Table Setup
-- Run this SQL in your Supabase SQL Editor
-- IMPORTANT: After running this, also run supabase-migration-add-status.sql to add status management

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT,
  phone TEXT NOT NULL,
  message TEXT,
  interest TEXT,
  source TEXT NOT NULL CHECK (source IN ('contact_form', 'newsletter', 'popup')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS leads_source_idx ON leads(source);

-- Enable Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts (for form submissions)
CREATE POLICY "Allow anonymous inserts" ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow authenticated users to read (for admin dashboard)
CREATE POLICY "Allow authenticated reads" ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Optional: Create a view for admin dashboard with formatted data
CREATE OR REPLACE VIEW leads_summary AS
SELECT 
  id,
  name,
  email,
  phone,
  message,
  interest,
  source,
  created_at,
  TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI') as formatted_date
FROM leads
ORDER BY created_at DESC;
