import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    const is_admin = localStorage.getItem("is_admin");
    if (token && is_admin === "1") {
      return { token, role: "admin" };
    }
    if (token) {
      return { token, role: "user" };
    }
    return null;
  });
  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };
  return (
    <AuthContext.Provider value={{ user, login, logout  }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
