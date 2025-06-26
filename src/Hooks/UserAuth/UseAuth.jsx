import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';

const UseAuth = () => {
    const userInfo = useContext(AuthContext);
    return userInfo;
};

export default UseAuth;