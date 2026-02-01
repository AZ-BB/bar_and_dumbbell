-- Migration: Add status and updated_at columns to leads table
-- Run this AFTER running supabase-setup.sql
-- This adds status management functionality to your leads table

-- Add status column with default 'new'
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'removed'));

-- Add updated_at column
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW());

-- Update existing leads to have 'new' status if null
UPDATE leads SET status = 'new' WHERE status IS NULL;

-- Create function to update updated_at timestamp (if not exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create policy to allow authenticated users to update (for status changes)
DROP POLICY IF EXISTS "Allow authenticated updates" ON leads;
CREATE POLICY "Allow authenticated updates" ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
