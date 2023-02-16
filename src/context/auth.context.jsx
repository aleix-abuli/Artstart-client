import axios from 'axios';
import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
import authService from '../services/auth.service';

const api = process.env.REACT_APP_API_URL;

const AuthContext = createContext();

function AuthProviderWrapper(props) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const storeToken = (token) => {localStorage.setItem('authToken', token)};

    const removeToken = () => {localStorage.removeItem('authToken')};

    const getToken = () => localStorage.getItem('authToken');

    const authenticateUser = () => {

        const storedToken = getToken();

        if(storedToken){
            authService
            .verify(storedToken)
            .then(({ data }) => {
                axios
                .get(`${api}/api/users/${data._id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
                .then(({ data }) => {
                    const user = data;
                    console.log('DATA IN AUTHENTICATUSER', user)
                    setIsLoggedIn(true);
                    setIsLoading(false);
                    setUser(user);
                });

            })
            .catch((_) => logOutUser());
        } else logOutUser();

    };

    const logOutUser = () => {
        removeToken();
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);
    };

    useEffect(() => {
        authenticateUser();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, user, setUser, storeToken, authenticateUser, logOutUser }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProviderWrapper };