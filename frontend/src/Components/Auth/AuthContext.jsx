/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
export const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        user: null,
        token: localStorage.getItem('token') || null,
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (authState.token) {
                try {
                    const response = await axios.get('http://localhost:4000/users/profile', {
                        headers: {
                            'Authorization': `Bearer ${authState.token}`,
                        },
                    });
                    setAuthState(prevState => ({
                        ...prevState,
                        user: response.data,
                    }));
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                    // Handle token expiration or invalid token
                    if (error.response?.status === 401) {
                        logout();
                    }
                }
            }
        };

        // Fetch user profile if token is available
        fetchUserProfile();
    }, [authState.token]);

    const login = (token, user) => {
        localStorage.setItem('token', token);
        setAuthState({ user, token });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuthState({ user: null, token: null });
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
