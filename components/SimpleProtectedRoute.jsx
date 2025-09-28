'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSimpleAuth } from '@/hooks/useSimpleAuth';

const SimpleProtectedRoute = ({ children }) => {
  const { isLoading, isAuthenticated, user } = useSimpleAuth();
  const router = useRouter();

  // Debug logging

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    } else if (!isLoading && isAuthenticated) {
    }
  }, [isLoading, isAuthenticated, user, router]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-12 shadow-2xl border border-gray-200/50 max-w-md mx-auto">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Verifying Access</h3>
          <p className="text-gray-600 mb-6">Please wait while we verify your access permissions...</p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  // Show nothing while redirecting
  if (!isAuthenticated) {
    return null;
  }

  // User is authenticated, render the protected content
  return <>{children}</>;
};

export default SimpleProtectedRoute;
