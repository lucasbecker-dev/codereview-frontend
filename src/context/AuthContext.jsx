import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check if user is already logged in by validating session with backend
        const checkAuthStatus = async () => {
            try {
                const response = await api.get('/auth/me');
                if (response.data) {
                    setUser(response.data);
                }
            } catch (err) {
                // If the request fails, the user is not authenticated
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    const login = async (email, password) => {
        try {
            setLoading(true);
            const response = await api.post('/auth/login', { email, password }, {
                withCredentials: true // Important for cookies to be sent/received
            });
            const { user } = response.data;

            setUser(user);
            setError(null);
            return user;
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        try {
            setLoading(true);
            const response = await api.post('/auth/register', userData);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout', {}, { withCredentials: true });
            setUser(null);
        } catch (err) {
            console.error('Logout error:', err);
            // Still clear user state even if the API call fails
            setUser(null);
        }
    };

    const value = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 