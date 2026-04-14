# Fix Supabase Storage RLS Error

## Error
```
new row violates row-level security policy
Status: 403
```

## Problem
Your Supabase Storage bucket has Row-Level Security (RLS) enabled, but no policies allow uploads.

## Quick Fix - Option 1: Disable RLS (Easiest)

### Steps:

1. **Go to Supabase Dashboard**
2. **Navigate to Storage** (left sidebar)
3. **Click on `blog-images` bucket**
4. **Click the 3 dots (⋮) → Edit bucket**
5. **Uncheck "Enable RLS"** or ensure it's set to Public
6. **Save**

## Quick Fix - Option 2: Add Storage Policies (Recommended)

If you want to keep RLS enabled for security, add these policies:

### 1. Go to SQL Editor

In Supabase Dashboard:
- Click **SQL Editor** (left sidebar)
- Click **New Query**

### 2. Run This SQL

```sql
-- Allow public read access to all files in blog-images bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'blog-images' );

-- Allow anyone to upload to blog-images bucket
CREATE POLICY "Public Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'blog-images' );

-- Allow anyone to update files in blog-images bucket
CREATE POLICY "Public Update"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'blog-images' );

-- Allow anyone to delete files in blog-images bucket
CREATE POLICY "Public Delete"
ON storage.objects FOR DELETE
USING ( bucket_id = 'blog-images' );
```

### 3. Click "Run" (or press Cmd/Ctrl + Enter)

You should see: "Success. No rows returned"

## Quick Fix - Option 3: Authenticated Only (Most Secure)

If you want only authenticated users to upload:

```sql
-- Allow public read access
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'blog-images' );

-- Allow authenticated users to upload
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'blog-images' );

-- Allow authenticated users to update
CREATE POLICY "Authenticated Update"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'blog-images' );

-- Allow authenticated users to delete
CREATE POLICY "Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'blog-images' );
```

**Note:** If you use this option, you'll need to authenticate with Supabase in your API route.

## Verify the Fix

### 1. Check Policies

In Supabase Dashboard:
1. Go to **Storage** → `blog-images`
2. Click **Policies** tab
3. You should see the policies listed

### 2. Test Upload

1. Go to your admin panel: `/admin/blog/posts`
2. Try uploading an image
3. Should work now! ✅

## Understanding the Error

### What is RLS?

Row-Level Security (RLS) is a Supabase feature that controls who can access data:
- **Enabled**: Need explicit policies to allow access
- **Disabled**: Anyone can access (public bucket)

### Why Did This Happen?

When you created the `blog-images` bucket:
- RLS was enabled by default
- No policies were created
- Result: All uploads blocked

### Public vs Private Buckets

**Public Bucket:**
- RLS disabled
- Anyone can read/write
- Good for: Blog images, public assets
- ✅ Recommended for your use case

**Private Bucket:**
- RLS enabled with policies
- Only authorized users can access
- Good for: User uploads, private files

## Recommended Solution

For a blog with admin-only uploads, I recommend **Option 1** (Disable RLS):

### Why?
- ✅ Simplest solution
- ✅ Images need to be public anyway
- ✅ Admin auth is handled separately
- ✅ No complex policies needed

### Steps:
1. Supabase Dashboard → Storage
2. Click `blog-images` bucket
3. Edit bucket settings
4. Ensure "Public bucket" is checked
5. Save

## Alternative: Use Service Role Key

If you want to keep RLS enabled but bypass it in your API:

### 1. Get Service Role Key

1. Supabase Dashboard → Settings → API
2. Copy "service_role" key (⚠️ Keep secret!)

### 2. Add to Environment Variables

```env
# .env.local
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### 3. Create Admin Supabase Client

```typescript
// lib/supabase-admin.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
})
```

### 4. Use in Upload Route

```typescript
// app/api/blog/upload-image/route.ts
import { supabaseAdmin } from "@/lib/supabase-admin";

// Replace supabase.storage with supabaseAdmin.storage
const { data, error } = await supabaseAdmin.storage
  .from("blog-images")
  .upload(fileName, buffer, {
    contentType: file.type,
    upsert: false,
  });
```

## Summary

**Fastest Fix:** Disable RLS on the bucket (make it public)

**Most Secure:** Keep RLS + use service role key for admin uploads

**Recommended:** Public bucket (images are public anyway)

Try the fastest fix first - it should solve your problem immediately! 🚀
