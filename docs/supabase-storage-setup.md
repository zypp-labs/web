# Supabase Storage Setup Guide

## Overview

Your admin dashboard now has full image upload capabilities using Supabase Storage. Images are uploaded to Supabase, stored in the database, and displayed on public blog pages.

## Quick Setup

### 1. Create Storage Bucket in Supabase

1. Go to your Supabase Dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **New Bucket**
4. Create a bucket named: `blog-images`
5. **Important**: Set the bucket to **Public** (so images can be accessed without authentication)
6. Click **Create Bucket**

### 2. Set Bucket Policies (Optional but Recommended)

For better security, you can set up policies:

```sql
-- Allow public read access
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'blog-images' );

-- Allow authenticated uploads (admin only)
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'blog-images' AND auth.role() = 'authenticated' );

-- Allow authenticated updates
CREATE POLICY "Authenticated Update"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'blog-images' AND auth.role() = 'authenticated' );

-- Allow authenticated deletes
CREATE POLICY "Authenticated Delete"
ON storage.objects FOR DELETE
USING ( bucket_id = 'blog-images' AND auth.role() = 'authenticated' );
```

### 3. Verify Environment Variables

Make sure these are in your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_anon_key
```

### 4. Test the Upload

1. Go to `/admin/blog/posts` and create a new post
2. Click "Upload Featured Image" 
3. Select an image (max 10MB, JPEG/PNG/WebP/GIF)
4. The image will upload to Supabase and display immediately
5. Save the post
6. View it on the public blog page - the image should display correctly

## Features

### ✅ Blog Post Featured Images
- Upload featured images when creating/editing blog posts
- Images stored in `blog-posts/` folder
- Aspect ratio: 16:9 (video)
- Automatic preview with remove option

### ✅ Author Avatars
- Upload author avatars in the Authors management page
- Images stored in `authors/` folder
- Aspect ratio: 1:1 (square)
- Perfect for profile pictures

### ✅ Image Validation
- **Max file size**: 10MB
- **Allowed formats**: JPEG, JPG, PNG, WebP, GIF
- **Server-side validation**: Both file type and size are checked
- **Client-side feedback**: Instant error messages

### ✅ Smart Image Display
- Uses `SafeImage` component for reliable rendering
- Handles Supabase Storage URLs automatically
- Shows fallback UI if image fails to load
- Optimized with Next.js Image component

## How It Works

### Upload Flow

1. **User selects image** → File is validated client-side
2. **Upload to API** → `/api/blog/upload-image` endpoint
3. **Server validation** → File type and size checked
4. **Supabase Storage** → File uploaded with unique name
5. **Public URL returned** → Stored in database
6. **Display on frontend** → SafeImage component renders it

### File Naming Convention

Files are automatically named with timestamp and random string:
```
blog-posts/1699999999999-abc123xyz.jpg
authors/1699999999999-def456uvw.png
```

This prevents naming conflicts and ensures uniqueness.

### Database Storage

The full Supabase public URL is stored in the database:
```
https://your-project.supabase.co/storage/v1/object/public/blog-images/blog-posts/1699999999999-abc123xyz.jpg
```

## Components

### ImageUpload Component

Reusable component for all image uploads:

```tsx
<ImageUpload
  value={imageUrl}
  onChange={(url) => setImageUrl(url)}
  folder="blog-posts"  // or "authors"
  label="Upload Image"
  aspectRatio="video"  // or "square" or "auto"
  disabled={loading}
/>
```

**Props:**
- `value`: Current image URL (string | null)
- `onChange`: Callback when image changes
- `folder`: Subfolder in storage bucket (default: "blog-posts")
- `label`: Button label (default: "Upload Image")
- `aspectRatio`: Display aspect ratio - "square" | "video" | "auto"
- `disabled`: Disable upload (default: false)

### Used In:
- **BlogPostEditor**: Featured image upload
- **AuthorDialog**: Avatar upload
- Can be used anywhere you need image uploads!

## Public Display

### Blog List Page (`/blog`)
- Displays featured images in grid
- Uses SafeImage for reliable rendering
- Responsive image sizing

### Blog Detail Page (`/blog/[slug]`)
- Large featured image at top
- Author avatar in header and bio section
- Optimized loading with priority flag

## Troubleshooting

### Images not uploading?

1. **Check bucket exists**: Go to Supabase Dashboard → Storage
2. **Verify bucket is public**: Click bucket → Settings → Public access enabled
3. **Check environment variables**: Make sure `NEXT_PUBLIC_SUPABASE_URL` is correct
4. **Check file size**: Must be under 10MB
5. **Check file type**: Only JPEG, PNG, WebP, GIF allowed

### Images not displaying?

1. **Check URL in database**: Should be full public URL
2. **Verify bucket permissions**: Bucket must be public
3. **Check browser console**: Look for CORS or 404 errors
4. **Test URL directly**: Copy image URL and open in browser

### CORS Issues?

If you get CORS errors:
1. Go to Supabase Dashboard → Storage → Configuration
2. Add your domain to allowed origins
3. For development, `http://localhost:3000` should work by default

## API Endpoints

### POST `/api/blog/upload-image`

Upload an image to Supabase Storage.

**Request:**
```typescript
const formData = new FormData();
formData.append("file", file);
formData.append("folder", "blog-posts"); // optional

const response = await fetch("/api/blog/upload-image", {
  method: "POST",
  body: formData,
});
```

**Response:**
```json
{
  "success": true,
  "url": "https://...supabase.co/storage/v1/object/public/blog-images/blog-posts/123-abc.jpg",
  "path": "blog-posts/123-abc.jpg",
  "fileName": "blog-posts/123-abc.jpg"
}
```

### GET `/api/blog/upload-image`

Check if storage bucket is accessible.

**Response:**
```json
{
  "success": true,
  "message": "Storage bucket is accessible"
}
```

## Best Practices

### Image Optimization

1. **Compress images** before uploading (use tools like TinyPNG)
2. **Use WebP format** when possible (better compression)
3. **Resize large images** to reasonable dimensions (e.g., 1920x1080 for featured images)
4. **Use appropriate aspect ratios**:
   - Blog featured images: 16:9
   - Author avatars: 1:1

### Security

1. **Never expose storage keys** in client-side code
2. **Use RLS policies** in Supabase for fine-grained access control
3. **Validate files server-side** (already implemented)
4. **Set file size limits** (currently 10MB)

### Performance

1. **Use Next.js Image component** (SafeImage does this)
2. **Enable priority loading** for above-the-fold images
3. **Lazy load** images below the fold
4. **Use appropriate image formats** (WebP > JPEG > PNG)

## Future Enhancements

Possible improvements:

- [ ] Image cropping/editing before upload
- [ ] Multiple image uploads (galleries)
- [ ] Image compression on upload
- [ ] CDN integration for faster delivery
- [ ] Image alt text management
- [ ] Bulk image management interface
- [ ] Image search and library

## Support

If you encounter issues:

1. Check Supabase Dashboard for storage errors
2. Review browser console for client-side errors
3. Check server logs for API errors
4. Verify environment variables are correct
5. Test with different image files

## Summary

✅ **Fully Integrated**: Images upload to Supabase Storage
✅ **Database Stored**: URLs saved in blog_posts and blog_authors tables
✅ **Public Display**: Images render correctly on blog pages
✅ **User Friendly**: Drag-and-drop or click to upload
✅ **Validated**: File type and size checked
✅ **Responsive**: Works on all devices
✅ **Reusable**: ImageUpload component can be used anywhere

Your admin dashboard now has complete image handling! 🎉
