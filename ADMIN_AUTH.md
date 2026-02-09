# Admin Authentication Setup

The admin dashboard is now protected with password authentication.

## Default Credentials

- **Password**: `admin123`

## How to Access Admin Dashboard

1. Navigate to `/admin` or click "Admin Dashboard" from the homepage
2. You'll be redirected to the login page at `/admin/login`
3. Enter the admin password
4. Click "Login"
5. You'll be redirected to the admin dashboard
6. Session lasts 24 hours

## Changing the Admin Password

### Method 1: Environment Variable (Recommended)

1. Open `.env.local`
2. Change the `ADMIN_PASSWORD` value:
   ```env
   ADMIN_PASSWORD=your-secure-password-here
   ```
3. Restart the development server

### Method 2: Edit the Auth Action

Alternatively, edit `app/actions/auth.ts` and change the default password.

## Security Notes

⚠️ **IMPORTANT FOR PRODUCTION:**

1. **Change the default password** immediately
2. Use a strong, unique password
3. Consider implementing proper authentication with:
   - Supabase Auth
   - NextAuth.js
   - Auth0 or similar services
4. Add rate limiting to prevent brute force attacks
5. Enable HTTPS in production
6. Use secure, httpOnly cookies (already configured)

## Current Implementation

- Uses HTTP-only cookies for session management
- Session expires after 24 hours
- Password is stored as environment variable
- Server-side authentication checks

## Logout

Click the "Logout" button in the admin dashboard header to end your session.

## Files Added

- `/app/admin/login/page.tsx` - Login page
- `/app/actions/auth.ts` - Authentication logic
- `/components/LogoutButton.tsx` - Logout button component
- Updated `/app/admin/page.tsx` - Protected admin dashboard
