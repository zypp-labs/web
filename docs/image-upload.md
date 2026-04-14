# Image Upload API Documentation

## Overview

The blog system supports image uploads through Supabase Storage. Images can be uploaded via the API and will be stored in the `blog-images` bucket.

## Setup

### 1. Create Supabase Storage Bucket

In your Supabase dashboard:

1. Go to Storage
2. Create a new bucket named `blog-images`
3. Set it to **Public** (so images can be accessed without authentication)
4. Configure CORS if needed for your domain

### 2. Environment Variables

Make sure you have these in your `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_anon_key
```

## API Endpoint

### POST `/api/blog/upload-image`

Upload an image to Supabase Storage.

**Request:**

- Method: `POST`
- Content-Type: `multipart/form-data`
- Body:
  - `file`: The image file (required)
  - `folder`: Optional folder name (default: "blog-posts")

**Response:**

```json
{
  "success": true,
  "url": "https://your-supabase-url/storage/v1/object/public/blog-images/blog-posts/1234567890-abc123.jpg",
  "path": "blog-posts/1234567890-abc123.jpg",
  "fileName": "blog-posts/1234567890-abc123.jpg"
}
```

**Example (JavaScript/TypeScript):**

```typescript
const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", "blog-posts"); // optional

  const response = await fetch("/api/blog/upload-image", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return data.url; // Use this URL in your blog post
};
```

**Example (React Component):**

```tsx
const ImageUploader = () => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/blog/upload-image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("Image URL:", data.url);
      // Use data.url in your blog post featured_image field
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleUpload}
      disabled={uploading}
    />
  );
};
```

## Image Display

Images are automatically handled by the `SafeImage` component, which:

- Handles Supabase Storage URLs
- Shows fallback UI if image fails to load
- Supports both fixed-size and fill images

**Usage:**

```tsx
import { SafeImage } from "@/components/custom/safe-image";

<SafeImage
  src={post.featured_image} // Can be full URL or storage path
  alt={post.title}
  fill
  className="object-cover"
/>;
```

## Storage Paths

When saving to the database, you can use either:

1. **Full URL**: `https://your-supabase-url/storage/v1/object/public/blog-images/path/to/image.jpg`
2. **Storage Path**: `blog-images/path/to/image.jpg` (will be automatically converted)

The `SafeImage` component handles both formats automatically.

## File Limits

- **Max file size**: 10MB
- **Allowed types**: JPEG, JPG, PNG, WebP, GIF
- **Validation**: Both file type and size are validated server-side

## Error Handling

The API returns appropriate error responses:

- `400`: Invalid file type or size
- `500`: Server error or storage error

Check the response for error details:

```json
{
  "error": "File size exceeds 10MB limit"
}
```
