// https://dev.to/earthcomfy/build-authentication-using-firebase-react-express-28ig

// we use React context to set up the authentication because we want to access the current user everywhere in our app
// React context allows us to share data (state) across our components more easily.

// By using useEffect hook, you tell React that your component needs to do something after render.
// React will remember the function you passed and call it later after performing the DOM updates.
// The useEffect hook allows components to react to lifecycle events such as mounting to the DOM, re-rendering, and unmounting.

import { createContext } from "react";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

// this will return a provider component
export const AuthContext = createContext(null);
// Provider provides state to its children. It takes in the value prop and passes it down to its children components that might need to access them.
export const AuthProvider = ({ children }) => {
  // check whether a token is stored in the local storage
  const token = localStorage.getItem("token");

  const [currentUser, setCurrentUser] = useState(() => {
    // if a token odes not exist in the local storage, currentUser is null
    if (!token) {
      return null;
    }
    // if we have a token we can obtain user infromation
    else {
      const decodedToken = jwtDecode(token);
      return { userId: decodedToken.userId, role: decodedToken.role };
    }
  });

  // So the user authenticated if a token exist
  const [isAuthenticated, setAuthenticated] = useState(() => {
    return token !== null;
  });

  // when you reload the page
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setAuthenticated(false);
        setCurrentUser(null);
      } else if (token) {
        const { userId, role } = jwtDecode(token);
        setAuthenticated(true);
        setCurrentUser(userId, role);
      }
    };
    verifyToken();
  }, [setAuthenticated, token]);

  // Login
  const login = (data) => {
    const { userId, role } = jwtDecode(data.token);
    localStorage.setItem("token", data.token);
    setAuthenticated(true);
    setCurrentUser({
      role: role,
      userId: userId,
    });
  };

  // Logout
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
