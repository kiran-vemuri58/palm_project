import { NextResponse } from 'next/server';
import { registerUser } from '@/lib/secureAuth';

export async function POST(request) {
  try {
    const { email, password, confirmPassword } = await request.json();

    // Basic validation
    if (!email || !password || !confirmPassword) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return NextResponse.json(
        { success: false, error: 'Passwords do not match' },
        { status: 400 }
      );
    }

    // Attempt registration
    const user = await registerUser(email, password);

    return NextResponse.json({
      success: true,
      message: 'Account created successfully. You can now sign in.',
      user: {
        email: user.email,
        id: user.id
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Account creation failed' 
      },
      { status: 400 }
    );
  }
}
