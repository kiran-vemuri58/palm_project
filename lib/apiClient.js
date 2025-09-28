'use client';

import { useRouter } from 'next/navigation';

// Create a centralized API client that handles 401 responses
export class ApiClient {
  constructor() {
    this.baseURL = '';
  }

  async request(url, options = {}) {
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // Include cookies in all requests
    };

    const config = {
      ...defaultOptions,
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // Handle 401 Unauthorized responses
      if (response.status === 401) {
        console.log('🔍 API returned 401, redirecting to login');
        // Clear only V2 store data (not authentication data since we use HttpOnly cookies)
        if (typeof window !== 'undefined') {
          localStorage.removeItem('v2-asset-storage');
          console.log('🗑️ Cleared V2 store data due to 401 error');
        }
        // Redirect to login page
        window.location.href = '/login';
        return { error: 'Unauthorized', status: 401 };
      }

      // Handle other error responses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return { 
          error: errorData.error || `HTTP ${response.status}`, 
          status: response.status 
        };
      }

      // Return successful response
      const data = await response.json();
      return { data, status: response.status };
    } catch (error) {
      console.error('API request error:', error);
      return { error: error.message, status: 0 };
    }
  }

  // Convenience methods
  async get(url, options = {}) {
    return this.request(url, { ...options, method: 'GET' });
  }

  async post(url, data, options = {}) {
    return this.request(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(url, data, options = {}) {
    return this.request(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(url, options = {}) {
    return this.request(url, { ...options, method: 'DELETE' });
  }
}

// Export a singleton instance
export const apiClient = new ApiClient();
