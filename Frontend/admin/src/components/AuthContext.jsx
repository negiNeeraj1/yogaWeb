import React, { createContext, useState, useContext, useCallback } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Modified to check for user information in localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("user") ? true : false
  );

  const login = useCallback((user) => {
    // Store the entire user object in localStorage
    localStorage.setItem("user", JSON.stringify(user));
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    // Remove user information from localStorage
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
