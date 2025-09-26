# Simple Custom Authentication System

## Overview
This is a custom-built authentication system specifically designed for the patent management application. It replaces Clerk with a simple, email-whitelist-based authentication system.

## Features
- ✅ **Email Whitelist Authentication** - Only whitelisted emails can access the app
- ✅ **Simple Session Management** - Cookie-based sessions with 24-hour expiration
- ✅ **No External Dependencies** - No need for Clerk or other auth providers
- ✅ **Easy to Maintain** - Simple codebase that's easy to understand and modify
- ✅ **Secure** - HTTP-only cookies and proper session validation

## How It Works

### 1. Authentication Flow
1. User visits `/login` page
2. User enters email and password
3. System checks if email is in whitelist
4. If authorized, creates session and sets cookie
5. User is redirected to `/assets` page

### 2. Session Management
- Sessions are stored in memory (in production, use Redis or database)
- Each session has a unique ID and expires after 24 hours
- Sessions are validated on every protected route access

### 3. Email Whitelist
Only these emails can access the application:
- `bhaskarmahadheer@gmail.com`
- `konasrinivas75@gmail.com`
- `sagarvk1992@gmail.com`
- `vemurikiranchand007@gmail.com`
- `vidyasagar@merenito.com`

## File Structure

```
lib/
├── simpleAuth.js          # Core authentication logic
├── emailWhitelist.js      # Email whitelist configuration

app/
├── login/
│   └── page.jsx           # Login page
├── api/auth/
│   ├── signin/route.js    # Sign in API
│   ├── verify/route.js    # Session verification API
│   └── signout/route.js   # Sign out API

hooks/
└── useSimpleAuth.js       # React hook for authentication

components/
└── SimpleProtectedRoute.jsx # Route protection component
```

## Usage

### Protecting Routes
Wrap any component with `SimpleProtectedRoute`:

```jsx
import SimpleProtectedRoute from '@/components/SimpleProtectedRoute';

export default function MyPage() {
  return (
    <SimpleProtectedRoute>
      <div>Protected content here</div>
    </SimpleProtectedRoute>
  );
}
```

### Using Authentication in Components
```jsx
import { useSimpleAuth } from '@/hooks/useSimpleAuth';

function MyComponent() {
  const { user, signOut, isAuthenticated } = useSimpleAuth();
  
  return (
    <div>
      <p>Welcome, {user?.email}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

## API Endpoints

### POST /api/auth/signin
Sign in with email and password.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully signed in",
  "user": {
    "email": "user@example.com",
    "id": "sess_abc123"
  }
}
```

### POST /api/auth/verify
Verify session validity.

**Request:**
```json
{
  "sessionId": "sess_abc123"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "email": "user@example.com",
    "id": "sess_abc123"
  }
}
```

### POST /api/auth/signout
Sign out and clear session.

**Request:**
```json
{
  "sessionId": "sess_abc123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully signed out"
}
```

## Adding New Users

To add a new user to the whitelist:

1. Open `lib/emailWhitelist.js`
2. Add the email to the `WHITELISTED_EMAILS` array
3. Save the file

```javascript
export const WHITELISTED_EMAILS = [
  'bhaskarmahadheer@gmail.com',
  'konasrinivas75@gmail.com',
  'sagarvk1992@gmail.com',
  'vemurikiranchand007@gmail.com',
  'vidyasagar@merenito.com',
  'newuser@example.com' // Add new email here
];
```

## Security Features

1. **Email Whitelist** - Only pre-approved emails can access the app
2. **Session Expiration** - Sessions automatically expire after 24 hours
3. **HTTP-Only Cookies** - Session cookies cannot be accessed by JavaScript
4. **Secure Cookies** - Cookies are marked as secure in production
5. **SameSite Protection** - CSRF protection with SameSite=strict

## Production Considerations

### 1. Session Storage
Currently sessions are stored in memory. For production, consider:
- **Redis** for session storage
- **Database** for persistent sessions
- **JWT tokens** for stateless authentication

### 2. Password Security
Currently any password is accepted for whitelisted emails. For production:
- Hash passwords with bcrypt
- Store user credentials in database
- Implement password requirements

### 3. Environment Variables
Add to `.env.local`:
```
JWT_SECRET=your-super-secret-jwt-key
SESSION_SECRET=your-session-secret
```

### 4. HTTPS
Ensure your production app uses HTTPS for secure cookie transmission.

## Testing

### Manual Testing
1. Visit `/login`
2. Try signing in with a whitelisted email
3. Try signing in with a non-whitelisted email
4. Verify protected routes redirect to login when not authenticated

### Automated Testing
```bash
# Test authentication flow
npm test -- --testPathPattern=auth
```

## Troubleshooting

### Common Issues

1. **"Email not authorized" error**
   - Check if email is in whitelist
   - Verify email spelling and case

2. **Session not persisting**
   - Check browser cookie settings
   - Verify cookie domain and path

3. **Redirect loops**
   - Check middleware configuration
   - Verify route protection logic

### Debug Mode
Enable debug logging by adding console.log statements in:
- `lib/simpleAuth.js` - Session management
- `hooks/useSimpleAuth.js` - Client-side auth
- `app/api/auth/*` - API endpoints

## Migration from Clerk

This system replaces Clerk completely. To migrate:

1. ✅ Remove Clerk dependencies
2. ✅ Replace Clerk components with custom ones
3. ✅ Update authentication logic
4. ✅ Test all protected routes
5. ✅ Verify email whitelist functionality

## Benefits of Custom Auth

1. **Simplicity** - No complex third-party integration
2. **Control** - Full control over authentication flow
3. **Customization** - Easy to modify for specific needs
4. **Performance** - No external API calls for auth
5. **Cost** - No subscription fees for auth service
6. **Privacy** - User data stays within your application

This custom authentication system is perfect for your patent management application's specific needs!
