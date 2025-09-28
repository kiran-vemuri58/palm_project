'use client';

import { useState, useEffect, useRef } from 'react';
import { apiClient } from '@/lib/apiClient';

// Global cache to prevent multiple API calls
let authStatusCache = {
  isLoading: true,
  isAuthenticated: false,
  user: null,
  error: null,
  lastChecked: 0
};

// Cache duration: 30 seconds
const CACHE_DURATION = 30 * 1000;

export function useSimpleAuth() {
  const [isLoading, setIsLoading] = useState(authStatusCache.isLoading);
  const [isAuthenticated, setIsAuthenticated] = useState(authStatusCache.isAuthenticated);
  const [user, setUser] = useState(authStatusCache.user);
  const [error, setError] = useState(authStatusCache.error);
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Only check auth status if we haven't initialized or cache is expired
    const now = Date.now();
    const isCacheValid = (now - authStatusCache.lastChecked) < CACHE_DURATION;
    
    if (!hasInitialized.current || !isCacheValid) {
      console.log('🔄 Auth status cache expired or not initialized, making API call...');
      checkAuthStatus();
      hasInitialized.current = true;
    } else {
      console.log('✅ Using cached auth status data');
      // Use cached data
      setIsLoading(authStatusCache.isLoading);
      setIsAuthenticated(authStatusCache.isAuthenticated);
      setUser(authStatusCache.user);
      setError(authStatusCache.error);
    }
  }, []);

  const checkAuthStatus = async () => {
    try {
      console.log('🔐 Making auth status API call...');
      // Make a request to check if we have a valid session
      const response = await fetch('/api/auth/status', {
        method: 'GET',
        credentials: 'include', // Include cookies in the request
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.user) {
          // Update cache
          authStatusCache = {
            isLoading: false,
            isAuthenticated: true,
            user: data.user,
            error: null,
            lastChecked: Date.now()
          };
          setIsAuthenticated(true);
          setUser(data.user);
        } else {
          // Update cache
          authStatusCache = {
            isLoading: false,
            isAuthenticated: false,
            user: null,
            error: null,
            lastChecked: Date.now()
          };
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        // Update cache
        authStatusCache = {
          isLoading: false,
          isAuthenticated: false,
          user: null,
          error: null,
          lastChecked: Date.now()
        };
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Auth status check failed:', error);
      // Update cache
      authStatusCache = {
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: error.message,
        lastChecked: Date.now()
      };
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };


  const signIn = async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies in the request
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Update cache
        authStatusCache = {
          isLoading: false,
          isAuthenticated: true,
          user: data.user,
          error: null,
          lastChecked: Date.now()
        };
        setIsAuthenticated(true);
        setUser(data.user);
        setIsLoading(false);
        return { success: true };
      } else {
        // Update cache
        authStatusCache = {
          isLoading: false,
          isAuthenticated: false,
          user: null,
          error: data.error,
          lastChecked: Date.now()
        };
        setError(data.error);
        setIsLoading(false);
        return { success: false, error: data.error };
      }
    } catch (error) {
      const errorMessage = 'Network error. Please try again.';
      // Update cache
      authStatusCache = {
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: errorMessage,
        lastChecked: Date.now()
      };
      setError(errorMessage);
      setIsLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  const signOut = async () => {
    try {
      await fetch('/api/auth/signout', {
        method: 'POST',
        credentials: 'include', // Include cookies in the request
      });
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      // Update cache
      authStatusCache = {
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: null,
        lastChecked: Date.now()
      };
      setIsAuthenticated(false);
      setUser(null);
      setError(null);
    }
  };

  // Function to manually refresh auth status (useful for after sign in/out)
  const refreshAuthStatus = () => {
    authStatusCache.lastChecked = 0; // Force refresh
    checkAuthStatus();
  };

  return {
    isLoading,
    isAuthenticated,
    user,
    error,
    signIn,
    signOut,
    refreshAuthStatus
  };
}
