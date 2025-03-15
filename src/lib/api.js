import axios from 'axios';

/**
 * Create an Axios instance with default config
 */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Add request interceptor to attach auth token
 */
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Add response interceptor to handle common errors
 */
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle token expiration
        if (error.response && error.response.status === 401) {
            // Check if the error is due to an invalid token
            const errorMessage = error.response.data.message;
            if (
                errorMessage === 'Invalid token.' ||
                errorMessage === 'Token expired.'
            ) {
                // Clear local storage
                localStorage.removeItem('token');
                localStorage.removeItem('user');

                // Redirect to login page if not already there
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login?session=expired';
                }
            }
        }

        return Promise.reject(error);
    }
);

export default api; 