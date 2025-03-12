import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ requiredRoles = [] }) => {
    const { user, isAuthenticated, loading } = useAuth();

    // Show loading state while checking authentication
    if (loading) {
        return <div>Loading...</div>;
    }

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // If roles are required, check if user has the required role
    if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    // If authenticated and has required role, render the child routes
    return <Outlet />;
};

export default ProtectedRoute; 