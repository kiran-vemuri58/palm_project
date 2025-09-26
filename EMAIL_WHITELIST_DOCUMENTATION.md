# Email Whitelist Authentication System

## Overview
This system implements email-based access control for the patent management application. Only users with whitelisted email addresses can access the application.

## Whitelisted Email Addresses
The following email addresses are authorized to access the application:

1. `bhaskarmahadheer@gmail.com`
2. `konasrinivas75@gmail.com`
3. `sagarvk1992@gmail.com`
4. `vemurikiranchand007@gmail.com`
5. `vidyasagar@merenito.com`

## System Components

### 1. Email Whitelist Configuration (`lib/emailWhitelist.js`)
- **Purpose**: Central configuration for whitelisted emails
- **Functions**:
  - `isEmailWhitelisted(email)`: Check if an email is whitelisted
  - `checkUserAuthorization(user)`: Check if a Clerk user is authorized
  - `getWhitelistedEmails()`: Get list of all whitelisted emails

### 2. Custom Authentication Hook (`hooks/useEmailAuth.js`)
- **Purpose**: React hook for email-based authentication
- **Returns**:
  - `isLoaded`: Whether authentication state is loaded
  - `isAuthorized`: Whether user is authorized
  - `isSignedIn`: Whether user is signed in
  - `user`: Clerk user object
  - `email`: User's email address
  - `error`: Any authentication error
  - `message`: Status message

### 3. Protected Route Component (`components/ProtectedRoute.jsx`)
- **Purpose**: Higher-order component to protect routes
- **Features**:
  - Automatic redirect to login if not signed in
  - Automatic redirect to unauthorized page if not authorized
  - Loading states during authentication checks

### 4. Unauthorized Access Component (`components/UnauthorizedAccess.jsx`)
- **Purpose**: Display unauthorized access message
- **Features**:
  - Shows user's email address
  - Lists all whitelisted emails
  - Provides sign out functionality
  - Professional error page design

### 5. Middleware Protection (`middleware.js`)
- **Purpose**: Server-side route protection
- **Protected Routes**:
  - `/assets/*` - Assets management page
  - `/assetForm1/*` - Invention Recognition form
  - `/assetForm2/*` - Invention Extraction form
  - `/assetForm3/*` - Patent Search form
  - `/assetForm4/*` - PCT Application form
  - `/assetForm5/*` - Complete Specification form
  - `/assetForm6/*` - Provisional Specification form
  - `/assetForm7/*` - Patent Publication form
  - `/assetForm8/*` - FER Received form
  - `/assetForm9/*` - FER Response form
  - `/admin/*` - Admin routes

### 6. Unauthorized Page (`app/unauthorized/page.jsx`)
- **Purpose**: Dedicated page for unauthorized users
- **Features**:
  - Displays user's email
  - Shows whitelisted emails
  - Provides sign out functionality

## How It Works

### 1. User Authentication Flow
1. User visits a protected route
2. Middleware checks if user is signed in
3. If not signed in, redirect to Clerk sign-in
4. If signed in, check email against whitelist
5. If email not whitelisted, redirect to unauthorized page
6. If email is whitelisted, allow access

### 2. Client-Side Protection
1. ProtectedRoute component wraps protected pages
2. useEmailAuth hook provides authentication state
3. Automatic redirects based on authentication status
4. Loading states during authentication checks

### 3. Error Handling
- Network errors during authentication
- Invalid email addresses
- Missing user data
- Graceful fallbacks for all error states

## Adding New Email Addresses

To add a new email address to the whitelist:

1. Open `lib/emailWhitelist.js`
2. Add the email to the `WHITELISTED_EMAILS` array
3. Save the file
4. The change takes effect immediately

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

## Testing

Run the email whitelist tests:
```bash
npm test lib/__tests__/emailWhitelist.test.js
```

## Security Features

1. **Server-Side Validation**: Middleware validates emails on every request
2. **Client-Side Protection**: React components provide additional protection
3. **Case Insensitive**: Email comparison is case-insensitive
4. **Whitespace Handling**: Automatically trims whitespace from emails
5. **Error Boundaries**: Graceful error handling throughout the system

## User Experience

### For Authorized Users
- Seamless access to all features
- No additional authentication steps
- Professional loading states

### For Unauthorized Users
- Clear error message explaining access denial
- List of authorized email addresses
- Easy sign out functionality
- Professional error page design

## Troubleshooting

### Common Issues

1. **User can't access despite having whitelisted email**
   - Check email spelling in whitelist
   - Verify email case sensitivity
   - Check for extra whitespace

2. **Unauthorized users can still access**
   - Verify middleware is properly configured
   - Check that all routes are protected
   - Ensure ProtectedRoute components are wrapping pages

3. **Infinite redirect loops**
   - Check middleware route matchers
   - Verify public routes are properly excluded
   - Check for conflicting redirects

### Debug Mode
Enable debug logging by adding console.log statements in:
- `middleware.js` - Server-side authentication
- `hooks/useEmailAuth.js` - Client-side authentication
- `components/ProtectedRoute.jsx` - Route protection

## Maintenance

### Regular Tasks
1. Review whitelist for outdated emails
2. Update email addresses as needed
3. Monitor authentication logs
4. Test new email additions

### Monitoring
- Check authentication success rates
- Monitor unauthorized access attempts
- Review error logs for authentication issues

## Future Enhancements

1. **Admin Panel**: Web interface for managing whitelist
2. **Email Verification**: Require email verification before access
3. **Role-Based Access**: Different access levels for different users
4. **Audit Logging**: Track all authentication attempts
5. **Bulk Email Management**: Import/export whitelist from CSV
