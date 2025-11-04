-- Create table for medicine bag submissions
CREATE TABLE public.receitas_digitais (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  medicines JSONB NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.receitas_digitais ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public submission)
CREATE POLICY "Anyone can submit recipes" 
ON public.receitas_digitais 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow reading all recipes
CREATE POLICY "Anyone can view recipes" 
ON public.receitas_digitais 
FOR SELECT 
USING (true);