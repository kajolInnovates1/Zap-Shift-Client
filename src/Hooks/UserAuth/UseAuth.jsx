import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';

const useAuth = () => {
    const userInfo = useContext(AuthContext);
    return userInfo;
};

export default useAuth;