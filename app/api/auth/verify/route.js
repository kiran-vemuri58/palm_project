import { NextResponse } from 'next/server';
import { validateSession } from '@/lib/secureAuth';

export async function POST(request) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'Session ID required' },
        { status: 400 }
      );
    }

    const authData = await validateSession(sessionId);

    if (!authData) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired session' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        email: authData.user.email,
        id: authData.user.id,
        isWhitelisted: authData.user.isWhitelisted
      }
    });

  } catch (error) {
    console.error('Session verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
