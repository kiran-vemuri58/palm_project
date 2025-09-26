'use client';

import { useState, useEffect } from 'react';

export function useSimpleAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const getSessionId = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('session-id');
    }
    return null;
  };

  const setSessionId = (sessionId) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('session-id', sessionId);
    }
  };

  const clearSessionId = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('session-id');
    }
  };

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const sessionId = getSessionId();
      
      if (!sessionId) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      try {
        const response = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId })
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setIsAuthenticated(true);
            setUser(data.user);
          } else {
            setIsAuthenticated(false);
            setUser(null);
            clearSessionId();
          }
        } else {
          setIsAuthenticated(false);
          setUser(null);
          clearSessionId();
        }
      } catch (error) {
        console.error('Error verifying session:', error);
        setIsAuthenticated(false);
        setUser(null);
        clearSessionId();
      }
    } catch (error) {
      setError(error.message);
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Get session ID from response cookies or set it manually
        const sessionId = data.sessionId || data.user?.id;
        if (sessionId) {
          setSessionId(sessionId);
        }
        setIsAuthenticated(true);
        setUser(data.user);
        return { success: true };
      } else {
        setError(data.error);
        return { success: false, error: data.error };
      }
    } catch (error) {
      const errorMessage = 'Network error. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      const sessionId = getSessionId();
      
      if (sessionId) {
        await fetch('/api/auth/signout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });
      }
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      clearSessionId();
      setIsAuthenticated(false);
      setUser(null);
      setError(null);
    }
  };

  return {
    isLoading,
    isAuthenticated,
    user,
    error,
    signIn,
    signOut,
    checkAuth
  };
}
