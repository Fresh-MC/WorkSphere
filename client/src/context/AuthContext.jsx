// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create context
const AuthContext = createContext();

// Custom hook
export const useAuth = () => useContext(AuthContext);

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  // Signup
  const signup = async (email, password, role) => {
  const response = await axios.post("http://localhost:5000/api/auth/signup", {
    email,
    password,
    role,
  });
  setUser(response.data.user);
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("user", JSON.stringify(response.data.user));
};


  // Login
  const login = async (email, password) => {
    const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
    setUser(response.data.user);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
