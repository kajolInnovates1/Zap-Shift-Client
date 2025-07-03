import React from 'react';
import useAuth from '../Hooks/UserAuth/UseAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    if (loading) {
        return <p>Loading.....</p>;
    }
    if (!user) {
        return <Navigate state={{ from: location }} to={'/login'} ></Navigate>
    }
    return children;
};

export default PrivateRoutes;