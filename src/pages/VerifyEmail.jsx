import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';

const VerifyEmail = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                setLoading(true);
                // Get token from URL query parameters
                const params = new URLSearchParams(location.search);
                const token = params.get('token');

                if (!token) {
                    setError('Verification token is missing');
                    setLoading(false);
                    return;
                }

                // Send verification request
                await api.post('/auth/verify', { token });
                setSuccess(true);

                // Redirect to login after 3 seconds
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } catch (err) {
                setError(err.response?.data?.message || 'Verification failed');
            } finally {
                setLoading(false);
            }
        };

        verifyEmail();
    }, [location.search, navigate]);

    if (loading) {
        return (
            <div className="verify-email">
                <h1>Verifying Your Email</h1>
                <p>Please wait while we verify your email address...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="verify-email">
                <h1>Verification Failed</h1>
                <p className="error">{error}</p>
                <p>
                    <a href="/login">Return to login</a>
                </p>
            </div>
        );
    }

    if (success) {
        return (
            <div className="verify-email">
                <h1>Email Verified!</h1>
                <p>Your email has been successfully verified.</p>
                <p>You will be redirected to the login page in a few seconds...</p>
                <p>
                    <a href="/login">Click here if you are not redirected</a>
                </p>
            </div>
        );
    }

    return null;
};

export default VerifyEmail; 