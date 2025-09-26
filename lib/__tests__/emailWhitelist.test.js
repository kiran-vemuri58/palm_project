import { isEmailWhitelisted, checkUserAuthorization, getWhitelistedEmails } from '../emailWhitelist';

describe('Email Whitelist', () => {
  test('should return correct whitelisted emails', () => {
    const emails = getWhitelistedEmails();
    expect(emails).toContain('bhaskarmahadheer@gmail.com');
    expect(emails).toContain('konasrinivas75@gmail.com');
    expect(emails).toContain('sagarvk1992@gmail.com');
    expect(emails).toContain('vemurikiranchand007@gmail.com');
    expect(emails).toContain('vidyasagar@merenito.com');
  });

  test('should correctly identify whitelisted emails', () => {
    expect(isEmailWhitelisted('bhaskarmahadheer@gmail.com')).toBe(true);
    expect(isEmailWhitelisted('konasrinivas75@gmail.com')).toBe(true);
    expect(isEmailWhitelisted('sagarvk1992@gmail.com')).toBe(true);
    expect(isEmailWhitelisted('vemurikiranchand007@gmail.com')).toBe(true);
    expect(isEmailWhitelisted('vidyasagar@merenito.com')).toBe(true);
  });

  test('should correctly identify non-whitelisted emails', () => {
    expect(isEmailWhitelisted('unauthorized@example.com')).toBe(false);
    expect(isEmailWhitelisted('test@gmail.com')).toBe(false);
    expect(isEmailWhitelisted('random@email.com')).toBe(false);
  });

  test('should handle case insensitive emails', () => {
    expect(isEmailWhitelisted('BHASKARMAHADHEER@GMAIL.COM')).toBe(true);
    expect(isEmailWhitelisted('Konasrinivas75@Gmail.Com')).toBe(true);
  });

  test('should handle emails with whitespace', () => {
    expect(isEmailWhitelisted(' bhaskarmahadheer@gmail.com ')).toBe(true);
    expect(isEmailWhitelisted('  konasrinivas75@gmail.com  ')).toBe(true);
  });

  test('should handle invalid inputs', () => {
    expect(isEmailWhitelisted('')).toBe(false);
    expect(isEmailWhitelisted(null)).toBe(false);
    expect(isEmailWhitelisted(undefined)).toBe(false);
    expect(isEmailWhitelisted(123)).toBe(false);
  });

  test('should correctly check user authorization', () => {
    const authorizedUser = {
      primaryEmailAddress: {
        emailAddress: 'bhaskarmahadheer@gmail.com'
      }
    };

    const unauthorizedUser = {
      primaryEmailAddress: {
        emailAddress: 'unauthorized@example.com'
      }
    };

    const noEmailUser = {
      primaryEmailAddress: null
    };

    const nullUser = null;

    expect(checkUserAuthorization(authorizedUser)).toEqual({
      isAuthorized: true,
      email: 'bhaskarmahadheer@gmail.com',
      message: 'User is authorized'
    });

    expect(checkUserAuthorization(unauthorizedUser)).toEqual({
      isAuthorized: false,
      email: 'unauthorized@example.com',
      message: 'Email address is not authorized to access this application'
    });

    expect(checkUserAuthorization(noEmailUser)).toEqual({
      isAuthorized: false,
      email: null,
      message: 'No email address found'
    });

    expect(checkUserAuthorization(nullUser)).toEqual({
      isAuthorized: false,
      email: null,
      message: 'User not authenticated'
    });
  });
});
