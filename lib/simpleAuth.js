// Simple authentication system for email whitelist
import { isEmailWhitelisted } from './emailWhitelist';

// Simple session storage (in production, use a database or Redis)
const sessions = new Map();

// Generate a simple session ID
function generateSessionId() {
  return 'sess_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

// Create a new session
export function createSession(email) {
  if (!isEmailWhitelisted(email)) {
    throw new Error('Email not authorized');
  }

  const sessionId = generateSessionId();
  const session = {
    id: sessionId,
    email: email,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
  };

  sessions.set(sessionId, session);
  return session;
}

// Get session by ID
export function getSession(sessionId) {
  if (!sessionId) return null;
  
  const session = sessions.get(sessionId);
  
  if (!session) return null;
  
  // Check if session is expired
  if (new Date() > session.expiresAt) {
    sessions.delete(sessionId);
    return null;
  }
  
  return session;
}

// Delete session
export function deleteSession(sessionId) {
  sessions.delete(sessionId);
}

// Clean up expired sessions (call this periodically)
export function cleanupExpiredSessions() {
  const now = new Date();
  for (const [sessionId, session] of sessions.entries()) {
    if (now > session.expiresAt) {
      sessions.delete(sessionId);
    }
  }
}

// Client-side utilities
export const clientAuth = {
  // Set session cookie
  setSession(sessionId) {
    document.cookie = `session-id=${sessionId}; path=/; max-age=${24 * 60 * 60}; secure; samesite=strict`;
  },

  // Get session ID from cookie
  getSessionId() {
    const cookies = document.cookie.split(';');
    const sessionCookie = cookies.find(cookie => cookie.trim().startsWith('session-id='));
    return sessionCookie ? sessionCookie.split('=')[1] : null;
  },

  // Clear session cookie
  clearSession() {
    document.cookie = 'session-id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  },

  // Check if user is authenticated
  async isAuthenticated() {
    const sessionId = this.getSessionId();
    if (!sessionId) return false;

    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      });
      
      return response.ok;
    } catch {
      return false;
    }
  },

  // Sign out
  signOut() {
    this.clearSession();
    window.location.href = '/login';
  }
};
