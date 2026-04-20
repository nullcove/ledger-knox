CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    type TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert messages
CREATE POLICY "Anyone can insert messages" ON messages
FOR INSERT WITH CHECK (true);

-- Only authenticated users (admins) can view messages (Optional, can be refined)
CREATE POLICY "Admins can view messages" ON messages
FOR SELECT USING (auth.role() = 'authenticated');
