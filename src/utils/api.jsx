import React from 'react';

// Fix: Use environment variable with fallback and remove /api from base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'ApiError';
  }
}

const handleResponse = async (response) => {
  try {
    const data = await response.json();
    if (!response.ok) {
      throw new ApiError(
        data.message || 'An error occurred',
        response.status,
        data
      );
    }
    return data;
  } catch (error) {
    console.error('API Response Error:', error);
    throw error;
  }
};

export const api = {
  // GET request
  get: async (endpoint) => {
    try {
      // Fix: Add /api to endpoint if not already present
      const apiEndpoint = endpoint.startsWith('/api') ? endpoint : `/api${endpoint}`;
      const response = await fetch(`${API_BASE_URL}${apiEndpoint}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      return handleResponse(response);
    } catch (error) {
      console.error('API GET Error:', error);
      throw new ApiError('Network error', 500);
    }
  },

  // POST request
  post: async (endpoint, data) => {
    try {
      const apiEndpoint = endpoint.startsWith('/api') ? endpoint : `/api${endpoint}`;
      const response = await fetch(`${API_BASE_URL}${apiEndpoint}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });
      return handleResponse(response);
    } catch (error) {
      console.error('API POST Error:', error);
      throw new ApiError('Network error', 500);
    }
  },

  // PUT request
  put: async (endpoint, data) => {
    try {
      const apiEndpoint = endpoint.startsWith('/api') ? endpoint : `/api${endpoint}`;
      const response = await fetch(`${API_BASE_URL}${apiEndpoint}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });
      return handleResponse(response);
    } catch (error) {
      console.error('API PUT Error:', error);
      throw new ApiError('Network error', 500);
    }
  },

  // DELETE request
  delete: async (endpoint) => {
    try {
      const apiEndpoint = endpoint.startsWith('/api') ? endpoint : `/api${endpoint}`;
      const response = await fetch(`${API_BASE_URL}${apiEndpoint}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      return handleResponse(response);
    } catch (error) {
      console.error('API DELETE Error:', error);
      throw new ApiError('Network error', 500);
    }
  }
};

// React hook for API calls
export const useApi = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const callApi = React.useCallback(async (apiMethod, ...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiMethod(...args);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, callApi };
};