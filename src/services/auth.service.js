import api from '../lib/api';

/**
 * Authentication service for handling user authentication
 */
class AuthService {
    /**
     * Register a new user
     * @param {Object} userData - User registration data
     * @returns {Promise} - API response
     */
    async register(userData) {
        try {
            const response = await api.post('/auth/register', userData);
            return response.data;
        } catch (error) {
            throw this._handleError(error);
        }
    }

    /**
     * Login a user
     * @param {Object} credentials - User login credentials
     * @returns {Promise} - API response with token
     */
    async login(credentials) {
        try {
            const response = await api.post('/auth/login', credentials);

            if (response.data.success && response.data.data.token) {
                this._setToken(response.data.data.token);
                this._setUser(response.data.data.user);
            }

            return response.data;
        } catch (error) {
            throw this._handleError(error);
        }
    }

    /**
     * Logout the current user
     */
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    /**
     * Get the current user profile
     * @returns {Promise} - API response with user data
     */
    async getCurrentUser() {
        try {
            const response = await api.get('/auth/me');
            return response.data;
        } catch (error) {
            throw this._handleError(error);
        }
    }

    /**
     * Check if user is authenticated
     * @returns {Boolean} - True if user is authenticated
     */
    isAuthenticated() {
        return !!this.getToken();
    }

    /**
     * Get the current authentication token
     * @returns {String|null} - JWT token or null
     */
    getToken() {
        return localStorage.getItem('token');
    }

    /**
     * Get the current user from local storage
     * @returns {Object|null} - User object or null
     */
    getUser() {
        const userStr = localStorage.getItem('user');
        if (!userStr) return null;

        try {
            return JSON.parse(userStr);
        } catch (error) {
            console.error('Error parsing user from localStorage:', error);
            return null;
        }
    }

    /**
     * Check if current user has a specific role
     * @param {String|Array} roles - Role or array of roles to check
     * @returns {Boolean} - True if user has the role
     */
    hasRole(roles) {
        const user = this.getUser();
        if (!user) return false;

        if (Array.isArray(roles)) {
            return roles.includes(user.role);
        }

        return user.role === roles;
    }

    /**
     * Store authentication token in localStorage
     * @param {String} token - JWT token
     * @private
     */
    _setToken(token) {
        localStorage.setItem('token', token);
    }

    /**
     * Store user object in localStorage
     * @param {Object} user - User object
     * @private
     */
    _setUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    /**
     * Handle API errors
     * @param {Error} error - Error object
     * @returns {Error} - Processed error
     * @private
     */
    _handleError(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return {
                status: error.response.status,
                message: error.response.data.message || 'An error occurred',
                data: error.response.data
            };
        } else if (error.request) {
            // The request was made but no response was received
            return {
                status: 0,
                message: 'No response from server. Please check your internet connection.',
                data: null
            };
        } else {
            // Something happened in setting up the request that triggered an Error
            return {
                status: 0,
                message: error.message || 'An unexpected error occurred',
                data: null
            };
        }
    }
}

export default new AuthService(); 