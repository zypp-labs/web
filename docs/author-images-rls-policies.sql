-- RLS Policies for author-images bucket
-- Run this in Supabase SQL Editor

-- Allow public read access to all files in author-images bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'author-images' );

-- Allow anyone to upload to author-images bucket
CREATE POLICY "Public Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'author-images' );

-- Allow anyone to update files in author-images bucket
CREATE POLICY "Public Update"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'author-images' );

-- Allow anyone to delete files in author-images bucket
CREATE POLICY "Public Delete"
ON storage.objects FOR DELETE
USING ( bucket_id = 'author-images' );
