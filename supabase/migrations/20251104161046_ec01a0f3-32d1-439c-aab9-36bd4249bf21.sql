-- Create storage bucket for medicine bag images
INSERT INTO storage.buckets (id, name, public)
VALUES ('medicine-bags', 'medicine-bags', true)
ON CONFLICT (id) DO NOTHING;

-- Create policy for anyone to view images
CREATE POLICY "Anyone can view medicine bag images"
ON storage.objects FOR SELECT
USING (bucket_id = 'medicine-bags');

-- Create policy for authenticated users to upload
CREATE POLICY "Anyone can upload medicine bag images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'medicine-bags');