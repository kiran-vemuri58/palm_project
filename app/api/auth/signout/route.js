import { NextResponse } from 'next/server';
import { deleteSession } from '@/lib/secureAuth';

export async function POST(request) {
  try {
    const { sessionId } = await request.json();

    if (sessionId) {
      await deleteSession(sessionId);
    }

    const response = NextResponse.json({
      success: true,
      message: 'Successfully signed out'
    });

    // Clear session cookie
    response.cookies.set('session-id', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0
    });

    return response;

  } catch (error) {
    console.error('Sign out error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
