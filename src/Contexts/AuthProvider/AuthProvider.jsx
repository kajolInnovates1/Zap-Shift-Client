import React, { useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../FIrebase/firebase.init';
const GoogleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const SignIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const logout = () => {
        setLoading(true);

        return signOut(auth);
    }
    const googleLogin = () => {
        return signInWithPopup(auth, GoogleProvider)
    }
    useEffect(() => {
        const unSubscirbe = onAuthStateChanged(auth, currentUser => {

            console.log('currrent', currentUser);
            setUser(currentUser);
            setLoading(false);
        });
        return () => unSubscirbe();

    }, [])
    const userInfo = {
        user,
        createUser,
        SignIn,
        logout,
        googleLogin,
        loading




    }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>

    );
};

export default AuthProvider;