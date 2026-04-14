# Admin Authentication

## Overview

The admin dashboard is now protected with password authentication. Only users with the correct password can access the admin panel.

## Access Details

**Admin Password:** `zyppprotected892`

**Login URL:** `/admin/login`

## How It Works

### 1. Login Flow

1. User visits any `/admin/*` route
2. Middleware checks for authentication cookie
3. If not authenticated → redirected to `/admin/login`
4. User enters password
5. Password verified against hardcoded value
6. Cookie set with 7-day expiration
7. User redirected to admin dashboard

### 2. Protected Routes

All routes under `/admin/*` are protected except:
- `/admin/login` - Login page (public)
- `/api/admin/auth` - Authentication API (public)

### 3. Session Management

- **Cookie Name:** `admin_auth`
- **Duration:** 7 days
- **Type:** HttpOnly, Secure (in production)
- **Storage:** Base64 encoded token

### 4. Logout

- Click "Logout" button in sidebar
- Cookie is deleted
- User redirected to login page

## Security Features

✅ **HttpOnly Cookies** - Prevents XSS attacks
✅ **Secure Flag** - HTTPS only in production
✅ **SameSite Protection** - CSRF protection
✅ **Middleware Protection** - Server-side route guarding
✅ **Token Verification** - Cookie validation on every request

## Files

### Created
- `/app/admin/login/page.tsx` - Login page UI
- `/app/api/admin/auth/route.ts` - Authentication API
- `/docs/admin-authentication.md` - This documentation

### Modified
- `/middleware.ts` - Added admin auth check
- `/components/admin/AdminSidebar.tsx` - Added logout functionality

## API Endpoints

### POST `/api/admin/auth`
Login with password

**Request:**
```json
{
  "password": "zyppprotected892"
}
```

**Response (Success):**
```json
{
  "success": true
}
```

**Response (Error):**
```json
{
  "error": "Invalid password"
}
```

### DELETE `/api/admin/auth`
Logout (clear session)

**Response:**
```json
{
  "success": true
}
```

### GET `/api/admin/auth`
Check authentication status

**Response (Authenticated):**
```json
{
  "authenticated": true
}
```

**Response (Not Authenticated):**
```json
{
  "authenticated": false
}
```

## Usage

### Accessing Admin Panel

1. Navigate to `/admin` or any admin route
2. You'll be redirected to `/admin/login`
3. Enter password: `zyppprotected892`
4. Click "Access Admin Panel"
5. You're now logged in for 7 days

### Logging Out

1. Click "Logout" button in the sidebar
2. You'll be redirected to login page
3. Session cookie is cleared

## Changing the Password

To change the admin password:

1. Open `/app/api/admin/auth/route.ts`
2. Change the `ADMIN_PASSWORD` constant:
   ```typescript
   const ADMIN_PASSWORD = "your_new_password";
   ```
3. Open `/middleware.ts`
4. Update the password check on line 30:
   ```typescript
   if (!decoded.startsWith("your_new_password")) {
   ```
5. Restart the server

## Security Notes

### Current Implementation

This is a **simple password-based authentication** suitable for:
- Single admin user
- Internal tools
- Development/staging environments
- Low-risk applications

### Production Recommendations

For production environments, consider:

1. **Use Environment Variables**
   ```typescript
   const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
   ```

2. **Hash Passwords**
   ```typescript
   import bcrypt from 'bcrypt';
   const isValid = await bcrypt.compare(password, hashedPassword);
   ```

3. **Use JWT Tokens**
   ```typescript
   import jwt from 'jsonwebtoken';
   const token = jwt.sign({ admin: true }, SECRET_KEY);
   ```

4. **Add Rate Limiting**
   - Prevent brute force attacks
   - Limit login attempts

5. **Add 2FA (Two-Factor Authentication)**
   - Email verification
   - SMS codes
   - Authenticator apps

6. **Use Proper User Management**
   - Multiple admin users
   - Role-based access control
   - User database with Supabase Auth

7. **Add Audit Logging**
   - Track login attempts
   - Log admin actions
   - Monitor suspicious activity

## Troubleshooting

### Can't Login

1. **Check password** - Must be exactly `zyppprotected892`
2. **Clear cookies** - Delete browser cookies and try again
3. **Check console** - Look for errors in browser console
4. **Verify API** - Test `/api/admin/auth` endpoint directly

### Logged Out Unexpectedly

1. **Cookie expired** - Session lasts 7 days
2. **Browser cleared cookies** - Login again
3. **Server restarted** - May need to re-login

### Redirect Loop

1. **Clear cookies** - Delete all cookies for the site
2. **Check middleware** - Verify middleware.ts is correct
3. **Restart server** - Stop and start the dev server

## Testing

### Manual Testing

1. **Test Login:**
   - Go to `/admin/login`
   - Enter wrong password → Should show error
   - Enter correct password → Should redirect to `/admin`

2. **Test Protection:**
   - Clear cookies
   - Try to access `/admin` → Should redirect to login
   - Try to access `/admin/blog/posts` → Should redirect to login

3. **Test Logout:**
   - Login successfully
   - Click logout button
   - Try to access `/admin` → Should redirect to login

### API Testing

```bash
# Test login
curl -X POST http://localhost:3000/api/admin/auth \
  -H "Content-Type: application/json" \
  -d '{"password":"zyppprotected892"}'

# Test auth check
curl http://localhost:3000/api/admin/auth

# Test logout
curl -X DELETE http://localhost:3000/api/admin/auth
```

## Summary

✅ **Password Protected** - Admin panel requires authentication
✅ **Secure Cookies** - HttpOnly, Secure, SameSite protection
✅ **Middleware Guard** - Server-side route protection
✅ **7-Day Sessions** - Stay logged in for a week
✅ **Easy Logout** - One-click logout from sidebar
✅ **Clean UI** - Beautiful login page with password toggle

Your admin dashboard is now secure! 🔒
