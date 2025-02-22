// import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
// import React, { createContext, useEffect, useState } from 'react';
// import { auth } from '../firebase/firbase.config';
// import useAxiosPublic from '../hooks/useAxiosPublic';

import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firbase.config";
import { createContext, useEffect, useState } from "react";



export const AuthContext = createContext(null)



const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider;
    // const axiosPublic = useAxiosPublic();

    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const singIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () =>{
        setLoading(true);
        return signOut(auth);
    }

    const updatUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser,{
            displayName: name, photoURL: photo
        });
    }

    const singInWithGoogle = () =>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const singOutUser = () =>{
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
          if(currentUser) {
            const userInfo = {email: currentUser.email};
            axiosPublic.post('/jwt', userInfo)
            .then(res => {
                if (res.data.token) {
                    localStorage.setItem('access-token', res.data.token);
                }
            })
          }
          else{
            localStorage.removeItem('access-token');
          }
            setLoading(false)
        })
        return() => {
            unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        singIn,
        logOut,
        singOutUser,
        updatUserProfile,
        singInWithGoogle


    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;