import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { isEmailWhitelisted } from './emailWhitelist';

// JWT secret - in production, use environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

// Simple JWT implementation (in production, use a proper JWT library like 'jsonwebtoken')
function createToken(payload) {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = btoa(JSON.stringify(payload));
  const signature = btoa(JSON.stringify({ secret: JWT_SECRET, payload: body }));
  return `${header}.${body}.${signature}`;
}

function verifyToken(token) {
  try {
    const [header, body, signature] = token.split('.');
    const payload = JSON.parse(atob(body));
    
    // Check if token is expired
    if (payload.exp && payload.exp < Date.now()) {
      return null;
    }
    
    return payload;
  } catch (error) {
    return null;
  }
}

// Session management
export class AuthSession {
  constructor(user) {
    this.user = user;
    this.isAuthenticated = true;
    this.isAuthorized = isEmailWhitelisted(user.email);
  }

  static fromToken(token) {
    const payload = verifyToken(token);
    if (!payload) return null;
    
    return new AuthSession(payload.user);
  }

  toToken() {
    return createToken({
      user: this.user,
      exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    });
  }
}

// Authentication middleware
export function withAuth(handler) {
  return async (req, res) => {
    const token = req.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    const session = AuthSession.fromToken(token);
    
    if (!session || !session.isAuthenticated) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    if (!session.isAuthorized) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    // Add session to request
    req.session = session;
    
    return handler(req, res);
  };
}

// Server-side authentication check
export async function getServerSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;
  
  if (!token) return null;
  
  return AuthSession.fromToken(token);
}

// Client-side authentication utilities
export const authUtils = {
  // Sign in user
  async signIn(email, password) {
    // In a real app, you'd validate credentials against a database
    // For now, we'll just check if email is whitelisted
    if (!isEmailWhitelisted(email)) {
      throw new Error('Email not authorized');
    }

    const user = {
      id: `user_${Date.now()}`,
      email: email,
      name: email.split('@')[0],
      createdAt: new Date().toISOString()
    };

    const session = new AuthSession(user);
    const token = session.toToken();

    // Set cookie
    document.cookie = `auth-token=${token}; path=/; max-age=${24 * 60 * 60}; secure; samesite=strict`;
    
    return session;
  },

  // Sign out user
  signOut() {
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    window.location.href = '/login';
  },

  // Get current session
  getSession() {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('auth-token='))
      ?.split('=')[1];
    
    if (!token) return null;
    
    return AuthSession.fromToken(token);
  },

  // Check if user is authenticated
  isAuthenticated() {
    const session = this.getSession();
    return session && session.isAuthenticated;
  },

  // Check if user is authorized
  isAuthorized() {
    const session = this.getSession();
    return session && session.isAuthenticated && session.isAuthorized;
  }
};
