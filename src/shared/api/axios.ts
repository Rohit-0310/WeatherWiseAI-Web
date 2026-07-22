import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://localhost:7008/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging or auth
apiClient.interceptors.request.use((config) => {
  return config;
});

// Response interceptor for generic error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // We can add global error toast here using Sonner if needed
    console.error('API Error:', error?.response?.data || error.message);
    return Promise.reject(error);
  }
);
