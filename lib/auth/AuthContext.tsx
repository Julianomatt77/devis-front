"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('devis_user');
        const token = localStorage.getItem('devis_token');
        setIsAuthenticated(!!(user && token));
    }, []);

    const login = (userInfo, token) => {
        localStorage.setItem('devis_user', JSON.stringify(userInfo));
        localStorage.setItem('devis_token', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('devis_user');
        localStorage.removeItem('devis_token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
