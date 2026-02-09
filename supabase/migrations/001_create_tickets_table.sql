-- Create tickets table
CREATE TABLE IF NOT EXISTS tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ticket submission fields
  date DATE NOT NULL,
  staff_name TEXT NOT NULL,
  department TEXT NOT NULL,
  position TEXT NOT NULL,
  email TEXT NOT NULL,
  ticket_type TEXT NOT NULL CHECK (
    ticket_type IN (
      'PRINTER',
      'LAPTOP',
      'DESKTOP',
      'NETWORK',
      'INTERNET',
      'OFFICE SUITE',
      'EMAIL PASSWORD RESET',
      'PHONE APP INSTALLATIONS'
    )
  ),
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  
  -- Admin fields
  is_resolved BOOLEAN DEFAULT FALSE,
  needs_escalation BOOLEAN DEFAULT FALSE,
  solution TEXT
);

-- Create index for better query performance
CREATE INDEX idx_tickets_created_at ON tickets(created_at DESC);
CREATE INDEX idx_tickets_is_resolved ON tickets(is_resolved);
CREATE INDEX idx_tickets_needs_escalation ON tickets(needs_escalation);
CREATE INDEX idx_tickets_email ON tickets(email);

-- Enable Row Level Security (RLS)
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (you can customize this based on your auth setup)
CREATE POLICY "Enable all operations for authenticated users" ON tickets
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_tickets_updated_at 
  BEFORE UPDATE ON tickets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
