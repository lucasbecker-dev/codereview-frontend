import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // This ensures cookies are sent with requests
});

// Add a response interceptor for error handling
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle different error status codes
        if (error.response) {
            switch (error.response.status) {
                case 401: // Unauthorized
                    // Redirect to login page
                    window.location.href = '/login';
                    break;
                case 403: // Forbidden
                    // Redirect to unauthorized page
                    window.location.href = '/unauthorized';
                    break;
                case 500: // Server error
                    console.error('Server error:', error);
                    break;
                default:
                    // Handle other errors
                    console.error('API error:', error);
            }
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Network error:', error.request);
        } else {
            // Something happened in setting up the request
            console.error('Request error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default api; 