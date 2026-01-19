-- Create leads table for storing qualified leads from chatbot
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  challenge TEXT,
  revenue_range TEXT,
  urgency TEXT,
  language TEXT DEFAULT 'en',
  source TEXT DEFAULT 'chatbot',
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting leads (anyone can submit a lead)
CREATE POLICY "Anyone can insert leads" 
ON public.leads 
FOR INSERT 
WITH CHECK (true);

-- Create policy for reading leads (only authenticated users can read)
CREATE POLICY "Authenticated users can read leads" 
ON public.leads 
FOR SELECT 
TO authenticated
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.update_leads_updated_at();