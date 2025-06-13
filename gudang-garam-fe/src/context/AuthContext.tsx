import React, { createContext, useState, useContext } from 'react';

interface AuthContextType {
    token: string;
    role: string;
    setAuth: (token: string, role: string) => void;
}

const AuthContext = createContext<AuthContextType>({ token: '', role: '', setAuth: () => {} });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState('');
    const [role, setRole] = useState('');

    const setAuth = (token: string, role: string) => {
        setToken(token);
        setRole(role);
    };

    return <AuthContext.Provider value={{ token, role, setAuth }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);