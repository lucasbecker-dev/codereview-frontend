import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';

const ResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token, setToken] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Get token from URL query parameters
        const params = new URLSearchParams(location.search);
        const tokenParam = params.get('token');

        if (!tokenParam) {
            setError('Reset token is missing');
            return;
        }

        setToken(tokenParam);
    }, [location.search]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate passwords
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            // Send reset password request
            await api.post('/auth/reset-password', { token, password });

            setSuccess(true);

            // Redirect to login after 3 seconds
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Password reset failed');
        } finally {
            setLoading(false);
        }
    };

    if (error && !token) {
        return (
            <div className="reset-password">
                <h1>Reset Password</h1>
                <p className="error">{error}</p>
                <p>
                    <a href="/forgot-password">Request a new password reset link</a>
                </p>
            </div>
        );
    }

    if (success) {
        return (
            <div className="reset-password">
                <h1>Password Reset Successful!</h1>
                <p>Your password has been successfully reset.</p>
                <p>You will be redirected to the login page in a few seconds...</p>
                <p>
                    <a href="/login">Click here if you are not redirected</a>
                </p>
            </div>
        );
    }

    return (
        <div className="reset-password">
            <h1>Reset Your Password</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="password">New Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength="8"
                    />
                    <small>Password must be at least 8 characters long</small>
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Resetting...' : 'Reset Password'}
                </button>
            </form>
        </div>
    );
};

export default ResetPassword; 