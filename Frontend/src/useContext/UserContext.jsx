import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("User");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  useEffect(() => {
    if (token) {
      setAuthToken(token);
    }
  }, [token]);

  // Function to log out
  const logOut = () => {
    localStorage.removeItem("User");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    setAuthToken(null);
  };

  // Function to update user and token in localStorage and state
  const updateUserAndToken = (userData, authToken) => {
    localStorage.setItem("User", JSON.stringify(userData));
    localStorage.setItem("token", authToken);
    setUser(userData);
    setToken(authToken);
    setAuthToken(authToken);
  };

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken, logOut, updateUserAndToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
