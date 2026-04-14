# Admin Dashboard Documentation

## Overview

The admin dashboard is a comprehensive management system for Zypp Labs, accessible at `/admin` or via subdomain `admin.zypp.fun`.

## Features

### Dashboard Overview
- **Analytics**: Real-time statistics for waitlist, newsletter, and blog posts
- **Growth Charts**: Visual representation of growth trends over the last 30 days
- **Recent Activity**: Timeline of recent actions across all modules

### Waitlist Management
- View all waitlist signups
- Search and filter entries
- Export to CSV
- Delete entries
- View source and IP address information

### Newsletter Management
- View all newsletter subscribers
- Toggle active/inactive status
- Filter by status (All/Active/Inactive)
- Search functionality
- Export to CSV
- Delete subscribers

### Blog Management

#### Posts
- Create, edit, and delete blog posts
- Rich text editor (HTML supported)
- Image upload for featured images
- Category and author assignment
- Tag management
- SEO fields (meta title, description, canonical URL)
- Publish/draft toggle
- Featured post flag
- Read time configuration

#### Categories
- Create, edit, and delete categories
- Name, slug, and description management
- Automatic slug generation

#### Tags
- Create, edit, and delete tags
- Name and slug management
- Automatic slug generation

#### Authors
- Create, edit, and delete authors
- Name, email, and bio management
- Avatar URL support
- Social links (Twitter, LinkedIn, GitHub)

## Setup

### 1. Subdomain Configuration

To make the admin dashboard work on a subdomain (`admin.zypp.fun`), you have two options:

#### Option A: Next.js Middleware (Recommended)

Create `middleware.ts` in the root:

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  
  // Check if accessing admin subdomain
  if (hostname.startsWith('admin.')) {
    // Rewrite to /admin path
    const url = request.nextUrl.clone()
    url.pathname = `/admin${url.pathname === '/' ? '' : url.pathname}`
    return NextResponse.rewrite(url)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
```

#### Option B: Separate Deployment

Deploy the admin section as a separate Next.js app with its own domain/subdomain.

### 2. Authentication Setup

Currently, the admin dashboard doesn't have authentication. To add it:

1. **Set up Supabase Auth**:
   - Create admin users in Supabase Auth
   - Add role-based access control

2. **Add Auth Middleware**:
   - Check for authenticated admin users
   - Redirect to login if not authenticated

3. **Example Auth Check** (add to `app/admin/layout.tsx`):

```typescript
import { createClient } from '@/lib/supabase-client'
import { redirect } from 'next/navigation'

export default async function AdminLayout({ children }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/admin/login')
  }
  
  // Check if user is admin (you'd check a role or email)
  // if (user.email !== 'admin@zypp.fun') {
  //   redirect('/')
  // }
  
  return (
    // ... layout content
  )
}
```

### 3. Environment Variables

Make sure these are set in your `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_anon_key
```

## API Routes

All admin API routes are prefixed with `/api/admin/`:

- `/api/admin/stats/*` - Dashboard statistics
- `/api/admin/activity` - Recent activity feed
- `/api/admin/analytics` - Chart data
- `/api/admin/waitlist` - Waitlist management
- `/api/admin/newsletter` - Newsletter management
- `/api/admin/blog/*` - Blog management

## Usage

### Creating a Blog Post

1. Navigate to **Blog Posts** → **New Post**
2. Fill in title, slug, excerpt, and content
3. Upload a featured image (optional)
4. Select category, author, and tags
5. Configure SEO settings
6. Click **Publish** or **Save Draft**

### Managing Categories/Tags/Authors

1. Navigate to respective section
2. Click **New [Item]**
3. Fill in required fields
4. Save

### Exporting Data

- **Waitlist**: Click **Export CSV** button
- **Newsletter**: Click **Export CSV** button

## Security Considerations

⚠️ **Important**: Before deploying to production:

1. **Add Authentication**: Implement proper admin authentication
2. **Rate Limiting**: Add rate limiting to API routes
3. **Input Validation**: All inputs are validated, but review for your use case
4. **CORS**: Configure CORS for subdomain if needed
5. **Environment Variables**: Never commit `.env.local` to version control

## Future Enhancements

- [ ] Rich text editor (Tiptap or similar)
- [ ] Image gallery management
- [ ] Bulk operations
- [ ] Advanced analytics
- [ ] Email campaign management
- [ ] User role management
- [ ] Activity logs
- [ ] Backup/restore functionality

