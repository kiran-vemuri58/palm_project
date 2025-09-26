import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { isEmailWhitelisted } from './emailWhitelist';

const prisma = new PrismaClient();

// Password hashing
export async function hashPassword(password) {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

// Password verification
export async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

// User registration
export async function registerUser(email, password) {
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format');
  }

  // Check if email is whitelisted
  if (!isEmailWhitelisted(email)) {
    throw new Error('Account creation is restricted to authorized users only');
  }

  // Validate password strength
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }

  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    throw new Error('Password must contain at least one uppercase letter, one lowercase letter, and one number');
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: email.toLowerCase().trim() }
  });

  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash password and create user
  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      isWhitelisted: true
    }
  });

  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt
  };
}

// User login
export async function loginUser(email, password) {
  // Get user
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase().trim() }
  });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Verify password
  const isValidPassword = await verifyPassword(password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid credentials');
  }

  // Update last login
  await prisma.user.update({
    where: { id: user.id },
    data: { lastLogin: new Date() }
  });

  return {
    id: user.id,
    email: user.email,
    lastLogin: new Date()
  };
}

// Session management
export async function createUserSession(userId) {
  const sessionId = 'sess_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  
  const session = await prisma.session.create({
    data: {
      id: sessionId,
      userId: userId,
      expiresAt: expiresAt
    }
  });
  
  return session;
}

export async function validateSession(sessionId) {
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true }
  });

  if (!session) return null;

  // Check if session is expired
  if (new Date() > session.expiresAt) {
    await prisma.session.delete({ where: { id: sessionId } });
    return null;
  }

  // Update last activity
  await prisma.session.update({
    where: { id: sessionId },
    data: { lastActivity: new Date() }
  });

  return {
    session,
    user: {
      id: session.user.id,
      email: session.user.email,
      isWhitelisted: session.user.isWhitelisted
    }
  };
}

// Middleware for API protection
export function requireAuth(handler) {
  return async (req, res) => {
    try {
      // Get session ID from cookie
      const sessionId = req.cookies['session-id'];
      
      if (!sessionId) {
        return res.status(401).json({ 
          success: false, 
          error: 'Authentication required' 
        });
      }

      // Validate session
      const authData = validateSession(sessionId);
      if (!authData) {
        return res.status(401).json({ 
          success: false, 
          error: 'Invalid or expired session' 
        });
      }

      // Add user info to request
      req.user = authData.user;
      req.session = authData.session;

      // Call the original handler
      return await handler(req, res);
    } catch (error) {
      console.error('Auth middleware error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Authentication error' 
      });
    }
  };
}

// Delete session
export async function deleteSession(sessionId) {
  await prisma.session.delete({
    where: { id: sessionId }
  });
}

// Cleanup expired sessions (call this periodically)
export async function cleanupExpiredSessions() {
  await prisma.session.deleteMany({
    where: {
      expiresAt: {
        lt: new Date()
      }
    }
  });
}
