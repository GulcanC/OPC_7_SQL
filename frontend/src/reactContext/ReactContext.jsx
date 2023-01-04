import React from "react";
import { useState, useEffect, createContext } from "react";
import jwtDecode from "jwt-decode";

// export React.createContext

export const ReactContext = createContext(null);

export const ContextProvider = ({ children }) => {
  const token = localStorage.getItem("token");

  const [currentUser, setCurrentUser] = useState(() => {
    // if we have a token in the local storage, we can get user info via decoded token
    // and we will store the info in the current user state
    if (token) {
      const decoded = jwtDecode(token);
      return { userId: decoded.userId, role: decoded.role };
    }
    // if there is no token return null
    else {
      return null;
    }
  });

  // if there is a token user is authenticated

  const [isAuthenticated, setAuthenticated] = useState(() => {
    return token !== null;
  });

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        const { userId, role } = jwtDecode(token);
        setCurrentUser({ userId, role });
        setAuthenticated(true);
      } else {
        setCurrentUser(null);
        setAuthenticated(false);
      }
    };
    verifyToken();
  }, [setAuthenticated, token]);

  //user login

  const login = (info) => {
    const { userId, role } = jwtDecode(info.token);
    localStorage.setItem("token", info.token);

    setAuthenticated(true);
    setCurrentUser({
      userId: userId,
      role: role,
    });
  };

  const logout = () => {
    setAuthenticated(false);
    setCurrentUser(null);
    localStorage.clear();
  };

  const value = {
    currentUser,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <ReactContext.Provider value={value}>{children}</ReactContext.Provider>
  );
};
