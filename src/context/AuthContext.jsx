import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/auth.service';

// Create auth context
const AuthContext = createContext(null);

/**
 * AuthProvider component to wrap the application with authentication context
 * @param {Object} props - Component props
 * @returns {JSX.Element} AuthProvider component
 */
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load user from localStorage on initial render
    useEffect(() => {
        const initAuth = async () => {
            try {
                setLoading(true);

                // Check if we have a token
                if (authService.isAuthenticated()) {
                    // Get user from localStorage first for immediate UI update
                    const storedUser = authService.getUser();
                    if (storedUser) {
                        setUser(storedUser);
                    }

                    // Then fetch fresh user data from API
                    try {
                        const response = await authService.getCurrentUser();
                        if (response.success) {
                            setUser(response.data);
                        } else {
                            // If API call fails, log out
                            authService.logout();
                            setUser(null);
                        }
                    } catch (err) {
                        console.error('Error fetching current user:', err);
                        // If API call errors, keep using stored user data
                        // This prevents logging users out when there are temporary API issues
                    }
                } else {
                    setUser(null);
                }
            } catch (err) {
                console.error('Auth initialization error:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    /**
     * Login a user
     * @param {Object} credentials - User credentials
     * @returns {Promise} Login result
     */
    const login = async (credentials) => {
        try {
            setLoading(true);
            setError(null);

            const response = await authService.login(credentials);

            if (response.success) {
                setUser(response.data.user);
                return { success: true };
            } else {
                setError(response.message);
                return { success: false, message: response.message };
            }
        } catch (err) {
            setError(err.message || 'Login failed');
            return { success: false, message: err.message || 'Login failed' };
        } finally {
            setLoading(false);
        }
    };

    /**
     * Register a new user
     * @param {Object} userData - User registration data
     * @returns {Promise} Registration result
     */
    const register = async (userData) => {
        try {
            setLoading(true);
            setError(null);

            const response = await authService.register(userData);

            if (response.success) {
                return { success: true };
            } else {
                setError(response.message);
                return { success: false, message: response.message };
            }
        } catch (err) {
            setError(err.message || 'Registration failed');
            return { success: false, message: err.message || 'Registration failed' };
        } finally {
            setLoading(false);
        }
    };

    /**
     * Logout the current user
     */
    const logout = () => {
        authService.logout();
        setUser(null);
    };

    /**
     * Check if user has a specific role
     * @param {String|Array} roles - Role or array of roles to check
     * @returns {Boolean} True if user has the role
     */
    const hasRole = (roles) => {
        if (!user) return false;

        if (Array.isArray(roles)) {
            return roles.includes(user.role);
        }

        return user.role === roles;
    };

    // Context value
    const value = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        hasRole,
        isAuthenticated: !!user
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Custom hook to use the auth context
 * @returns {Object} Auth context
 */
export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export default AuthContext; 