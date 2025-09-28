'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSimpleAuth } from '@/hooks/useSimpleAuth';
import useV2Store from '@/store/v2Store';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { signIn, isLoading } = useSimpleAuth();
  const clearAllDataAndAssetId = useV2Store((state) => state.clearAllDataAndAssetId);

  // Clear all V2 store data when login page loads
  useEffect(() => {
    console.log('🔐 Login page loaded - clearing all V2 store data');
    clearAllDataAndAssetId();
  }, [clearAllDataAndAssetId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Test localStorage functionality
    console.log('🔍 Testing localStorage before login...');
    console.log('🔍 localStorage available:', typeof localStorage !== 'undefined');
    if (typeof localStorage !== 'undefined') {
      console.log('🔍 Current localStorage session-id:', localStorage.getItem('session-id'));
    }

    // Validate passwords match for registration
    if (isRegistering && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (isRegistering) {
      // Handle registration
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, confirmPassword }),
        });

        const data = await response.json();

        if (data.success) {
          setError('');
          setIsRegistering(false);
          setPassword('');
          setConfirmPassword('');
          alert('Account created successfully! Please sign in.');
        } else {
          setError(data.error || 'Registration failed');
        }
      } catch (error) {
        setError('Network error. Please try again.');
      }
    } else {
      // Handle login using the hook
      console.log('🔍 Starting login process...');
      const result = await signIn(email, password);
      console.log('🔍 Login result:', result);
      
      if (result.success) {
        console.log('🔍 Login successful, navigating to assets...');
        
        // Test localStorage after login
        console.log('🔍 Testing localStorage after login...');
        if (typeof localStorage !== 'undefined') {
          console.log('🔍 localStorage session-id after login:', localStorage.getItem('session-id'));
        }
        
        // Wait longer to ensure authentication state is properly set
        setTimeout(() => {
          console.log('🔍 Redirecting to /v2/assets');
          // Use window.location.href for a clean navigation that will trigger auth check
          window.location.href = '/v2/assets';
        }, 500); // Increased delay to 500ms
      } else {
        console.log('❌ Login failed:', result.error);
        setError(result.error || 'Sign in failed');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-200/50">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isRegistering ? 'Create Account' : 'Sign In'}
            </h1>
            <p className="text-gray-600">
              {isRegistering 
                ? 'Create your account to access the system' 
                : 'Sign in to your account'
              }
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter your email address"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  placeholder={isRegistering ? "Create a strong password" : "Enter your password"}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {isRegistering && (
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 8 characters with uppercase, lowercase, and number
                </p>
              )}
            </div>

            {isRegistering && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span className="text-red-800 font-medium">{error}</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  {isRegistering ? 'Creating Account...' : 'Signing In...'}
                </div>
              ) : (
                isRegistering ? 'Create Account' : 'Sign In'
              )}
            </button>

            {/* Toggle between login and register */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setError('');
                  setPassword('');
                  setConfirmPassword('');
                }}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium underline"
              >
                {isRegistering 
                  ? 'Already have an account? Sign in' 
                  : "Don't have an account? Register"
                }
              </button>
            </div>
          </form>

          {/* Security Notice */}
          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <p className="text-sm text-gray-700 font-medium">
                {isRegistering 
                  ? 'Account creation is restricted to authorized users only'
                  : 'Access is restricted to authorized users only'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
