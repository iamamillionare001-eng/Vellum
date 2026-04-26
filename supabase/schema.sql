-- Run this in your Supabase SQL Editor

CREATE TABLE public.triggers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL, -- Assuming integration with auth.users or a custom users table
  keyword TEXT NOT NULL,
  response_type TEXT NOT NULL CHECK (response_type IN ('link', 'AI')),
  payload JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Optional: Add Row Level Security (RLS) policies
ALTER TABLE public.triggers ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to insert their own triggers
CREATE POLICY "Users can create their own triggers"
ON public.triggers FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to view their own triggers
CREATE POLICY "Users can view their own triggers"
ON public.triggers FOR SELECT
USING (auth.uid() = user_id);
