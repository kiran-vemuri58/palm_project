import { NextResponse } from 'next/server';
import { validateSession } from '@/lib/secureAuth';

// Authentication middleware for API routes
export async function authenticateRequest(req) {
  try {
    const sessionId = req.cookies.get('session-id')?.value;
    
    if (!sessionId) {
      return { success: false, status: 401, message: 'No session found' };
    }

    const user = await validateSession(sessionId);
    
    if (!user) {
      return { success: false, status: 401, message: 'Invalid session' };
    }

    return { success: true, user };
  } catch (error) {
    console.error('Authentication error:', error);
    return { success: false, status: 401, message: 'Authentication failed' };
  }
}

// Helper function to create 401 response
export function createUnauthorizedResponse(message = 'Unauthorized') {
  return NextResponse.json(
    { success: false, error: message },
    { status: 401 }
  );
}

// Helper function to wrap API handlers with authentication
export function withAuth(handler) {
  return async (req, ...args) => {
    const authResult = await authenticateRequest(req);
    if (!authResult.success) {
      return createUnauthorizedResponse(authResult.message);
    }
    
    // Add user to request object for use in handler
    req.user = authResult.user;
    return handler(req, ...args);
  };
}
