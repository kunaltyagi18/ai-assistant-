import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const API_BASE_URL =  "http://localhost:4000";

  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  // Persist user & token
  useEffect(() => {
    if (user && token) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [user, token]);

  const login = async (email, password) => {
    const res = await axios.post("http://localhost:4000/api/auth/login", 
      { email, password },
      { withCredentials: true }
    );
  
    const userData = res.data.data;
  
    setUser(userData);
    setToken(userData.token);
  
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);
  };
  const signup = async (name, email, password) => {
    const res = await axios.post(`${API_BASE_URL}/api/auth/signup`, { name, email, password });
    setUser(res.data.user);
    setToken(res.data.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
