# Author Images Bucket Setup

## Overview

Author avatars are now stored in a separate `author-images` bucket, while blog post images remain in the `blog-images` bucket. This separation provides better organization and management.

## Quick Setup

### 1. Create Author Images Bucket

1. **Go to Supabase Dashboard** → https://supabase.com/dashboard
2. **Click "Storage"** in the left sidebar
3. **Click "New Bucket"**
4. **Bucket name:** `author-images`
5. **Make it Public:** ✅ Check "Public bucket"
6. **Click "Create bucket"**

### 2. Set Bucket Policies (If RLS Enabled)

If you want to keep RLS enabled, run this SQL:

```sql
-- Allow public read access
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'author-images' );

-- Allow public upload
CREATE POLICY "Public Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'author-images' );

-- Allow public update
CREATE POLICY "Public Update"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'author-images' );

-- Allow public delete
CREATE POLICY "Public Delete"
ON storage.objects FOR DELETE
USING ( bucket_id = 'author-images' );
```

### 3. Test Upload

1. Go to `/admin/blog/authors`
2. Create or edit an author
3. Upload an avatar image
4. Save
5. View a blog post with that author
6. ✅ Avatar should display correctly

## How It Works

### Two Separate Buckets

**blog-images bucket:**
- Blog post featured images
- Folder: `blog-posts/`
- Example: `blog-posts/1699999999-abc123.jpg`

**author-images bucket:**
- Author avatar images
- Folder: `avatars/`
- Example: `avatars/1699999999-xyz789.png`

### Upload Flow

**Blog Post Image:**
```typescript
<ImageUpload
  value={featured_image}
  onChange={(url) => setFeaturedImage(url)}
  folder="blog-posts"
  bucket="blog-images"  // Default
/>
```

**Author Avatar:**
```typescript
<ImageUpload
  value={avatar_url}
  onChange={(url) => setAvatarUrl(url)}
  folder="avatars"
  bucket="author-images"  // Separate bucket
/>
```

### URL Structure

**Blog Image URL:**
```
https://abc.supabase.co/storage/v1/object/public/blog-images/blog-posts/123-abc.jpg
```

**Author Avatar URL:**
```
https://abc.supabase.co/storage/v1/object/public/author-images/avatars/123-xyz.png
```

### SafeImage Component

The `SafeImage` component automatically detects which bucket to use:

```typescript
// Detects author-images bucket
if (url.includes("author-images") || url.includes("avatars")) {
  bucket = "author-images";
}

// Constructs correct URL
return `${supabaseUrl}/storage/v1/object/public/${bucket}/${cleanPath}`;
```

## Files Modified

### 1. ImageUpload Component
- Added `bucket` prop
- Passes bucket to upload API
- Default: `"blog-images"`

### 2. Upload API
- Accepts `bucket` parameter
- Uploads to specified bucket
- Returns bucket in response

### 3. AuthorDialog
- Uses `bucket="author-images"`
- Uses `folder="avatars"`

### 4. SafeImage Component
- Auto-detects bucket from URL
- Handles both `blog-images` and `author-images`
- Constructs correct public URLs

## Benefits

### ✅ Better Organization
- Blog images separate from author images
- Easier to manage and backup
- Clear folder structure

### ✅ Independent Permissions
- Can set different policies per bucket
- More granular access control
- Better security

### ✅ Easier Cleanup
- Delete all author avatars without affecting blog images
- Bulk operations per bucket
- Simpler maintenance

### ✅ Better Performance
- Smaller bucket sizes
- Faster listing operations
- Optimized queries

## Storage Structure

```
Supabase Storage
├── blog-images/
│   └── blog-posts/
│       ├── 1699999999-abc123.jpg
│       ├── 1699999999-def456.png
│       └── ...
│
└── author-images/
    └── avatars/
        ├── 1699999999-xyz789.png
        ├── 1699999999-uvw012.jpg
        └── ...
```

## Migration (If Needed)

If you have existing author images in `blog-images` bucket:

### Option 1: Leave Them (Recommended)
- Old images will still work
- SafeImage handles both buckets
- New uploads go to `author-images`

### Option 2: Migrate Manually
1. Download images from `blog-images/authors/`
2. Upload to `author-images/avatars/`
3. Update database URLs
4. Delete old images

### Option 3: SQL Migration
```sql
-- Update author avatar URLs (if stored as paths)
UPDATE blog_authors
SET avatar_url = REPLACE(avatar_url, 'blog-images/authors/', 'author-images/avatars/')
WHERE avatar_url LIKE '%blog-images/authors/%';
```

## Troubleshooting

### Author Avatars Not Showing?

**1. Check bucket exists:**
- Supabase Dashboard → Storage
- Look for `author-images` bucket
- If missing, create it

**2. Check bucket is public:**
- Click `author-images` bucket
- Settings → Public bucket ✅

**3. Check image URL:**
```sql
SELECT id, name, avatar_url FROM blog_authors;
```
Should contain `author-images` in URL

**4. Check browser console:**
- Look for 404 errors
- Check if URL is correct
- Verify bucket name

**5. Test direct URL:**
Copy avatar URL and open in browser:
```
https://your-project.supabase.co/storage/v1/object/public/author-images/avatars/123.png
```

### Upload Fails?

**Error: "Storage bucket not accessible"**
- Bucket doesn't exist → Create it
- Bucket is private → Make it public or add policies

**Error: "new row violates row-level security policy"**
- RLS is enabled without policies
- Solution: Add policies (see above) or make bucket public

## Summary

✅ **Two Buckets:** `blog-images` and `author-images`
✅ **Automatic Detection:** SafeImage knows which bucket to use
✅ **Better Organization:** Clear separation of image types
✅ **Easy Setup:** Just create the bucket and it works
✅ **Backward Compatible:** Old images still work

Create the `author-images` bucket in Supabase and you're all set! 🎉
