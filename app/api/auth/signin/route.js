import { NextResponse } from 'next/server';
import { loginUser, createUserSession } from '@/lib/secureAuth';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Attempt login
    const user = await loginUser(email, password);

    // Create session
    const session = await createUserSession(user.id);

    // Create response with session cookie
    const response = NextResponse.json({
      success: true,
      message: 'Successfully signed in',
      user: {
        email: user.email,
        id: user.id
      },
      sessionId: session.id
    });

    // Set session cookie
    response.cookies.set('session-id', session.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 // 24 hours
    });

    return response;

  } catch (error) {
    console.error('Sign in error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Invalid credentials' 
      },
      { status: 401 }
    );
  }
}
