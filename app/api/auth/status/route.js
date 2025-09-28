import { NextResponse } from 'next/server';
import { validateSession } from '@/lib/secureAuth';

export async function GET(request) {
  try {
    const sessionId = request.cookies.get('session-id')?.value;
    
    if (!sessionId) {
      return NextResponse.json({
        success: false,
        message: 'No session found'
      }, { status: 401 });
    }

    const user = await validateSession(sessionId);
    
    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'Invalid session'
      }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Auth status check error:', error);
    return NextResponse.json({
      success: false,
      message: 'Authentication failed'
    }, { status: 401 });
  }
}
