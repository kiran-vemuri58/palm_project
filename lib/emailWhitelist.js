// Email whitelist configuration
export const WHITELISTED_EMAILS = [
  'bhaskarmahadheer@gmail.com',
  'konasrinivas75@gmail.com',
  'sagarvk1992@gmail.com',
  'vemurikiranchand007@gmail.com',
  'vidyasagar@merenito.com'
];

/**
 * Check if an email is in the whitelist
 * @param {string} email - The email to check
 * @returns {boolean} - True if email is whitelisted, false otherwise
 */
export function isEmailWhitelisted(email) {
  if (!email || typeof email !== 'string') {
    return false;
  }
  
  // Normalize email (lowercase, trim whitespace)
  const normalizedEmail = email.toLowerCase().trim();
  
  return WHITELISTED_EMAILS.includes(normalizedEmail);
}

/**
 * Get the list of whitelisted emails (for display purposes)
 * @returns {string[]} - Array of whitelisted emails
 */
export function getWhitelistedEmails() {
  return [...WHITELISTED_EMAILS];
}

/**
 * Check if the current user is authorized based on their email
 * @param {Object} user - Clerk user object
 * @returns {Object} - { isAuthorized: boolean, email: string, message: string }
 */
export function checkUserAuthorization(user) {
  if (!user) {
    return {
      isAuthorized: false,
      email: null,
      message: 'User not authenticated'
    };
  }

  // Try multiple ways to get the email from Clerk user object
  const userEmail = user.primaryEmailAddress?.emailAddress || 
                   user.emailAddresses?.[0]?.emailAddress ||
                   user.emailAddresses?.[0]?.email_address ||
                   user.email;
  
  console.log('🔍 Email extraction debug:', {
    user,
    primaryEmailAddress: user.primaryEmailAddress,
    emailAddresses: user.emailAddresses,
    extractedEmail: userEmail
  });
  
  if (!userEmail) {
    return {
      isAuthorized: false,
      email: null,
      message: 'No email address found in user object'
    };
  }

  const isAuthorized = isEmailWhitelisted(userEmail);
  
  console.log('🔍 Authorization check:', {
    userEmail,
    isAuthorized,
    whitelistedEmails: WHITELISTED_EMAILS
  });
  
  return {
    isAuthorized,
    email: userEmail,
    message: isAuthorized 
      ? 'User is authorized' 
      : 'Email address is not authorized to access this application'
  };
}
