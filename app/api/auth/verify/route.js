import { NextResponse } from 'next/server';
import { validateSession } from '@/lib/secureAuth';

export async function POST(request) {
  try {
    const { sessionId } = await request.json();
    console.log('🔍 Verify API - Received sessionId:', sessionId);

    if (!sessionId) {
      console.log('❌ Verify API - No sessionId provided');
      return NextResponse.json(
        { success: false, error: 'Session ID required' },
        { status: 400 }
      );
    }

    console.log('🔍 Verify API - Validating session...');
    const authData = await validateSession(sessionId);

    if (!authData) {
      console.log('❌ Verify API - Invalid or expired session');
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
    console.error('❌ Session verification error:', error);
    console.error('❌ Error details:', error.message);
    console.error('❌ Error stack:', error.stack);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
