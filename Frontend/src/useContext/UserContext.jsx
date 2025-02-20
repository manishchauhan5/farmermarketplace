import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

// Create UserContext
const UserContext = createContext();

// Create Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Load user and token from localStorage on component mount
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };
  
  useEffect(() => {
    const savedUser = localStorage.getItem("User");
    const savedToken = localStorage.getItem("token");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedToken) {
      setToken(savedToken);
      setAuthToken(savedToken); 
    }
  }, []);

    const logOut = () => {
    localStorage.removeItem("User");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    setAuthToken(null); 
  };

  const updateUserAndToken = (userData, authToken) => {
    localStorage.setItem("User", JSON.stringify(userData));
    localStorage.setItem("token", authToken);
    setUser(userData);
    setToken(authToken);
    setAuthToken(authToken); 
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, token, setToken, logOut, updateUserAndToken }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using UserContext
export const useUser = () => useContext(UserContext);
