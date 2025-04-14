// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Load user from cookie if available
  const [user, setUser] = useState(() => {
    const cookieUser = Cookies.get('userData');
    return cookieUser ? JSON.parse(cookieUser) : null;
  });

  // Helper properties for consumers
  const isLoggedIn = Boolean(user);
  const userRole = user ? user.roleType : null; // roleType should be part of your API response
  const login = (loginResponse) => {
    if (loginResponse && loginResponse.userData) {
      setUser(loginResponse.userData);
      // Set a secure cookie for persistence (expires in 7 days)
      Cookies.set('userData', JSON.stringify(loginResponse.userData), {
        expires: 7,
        secure: process.env.NODE_ENV !== "development",
        sameSite: 'strict'
      });
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('userData');
  };

  // Optional: Keep cookie in sync with user state changes.
  useEffect(() => {
    if (user) {
      Cookies.set('userData', JSON.stringify(user), {
        expires: 7,
        secure: process.env.NODE_ENV !== "development",
        sameSite: 'strict'
      });
    } else {
      Cookies.remove('userData');
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
