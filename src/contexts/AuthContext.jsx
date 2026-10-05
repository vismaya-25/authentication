import { createContext, useContext, useEffect, useState } from "react";

import {
  loginUser,
  registerUser,
  getUserById,
  checkUsername as checkUsernameApi,
} from "../services/authApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCurrentUser = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setIsLoading(false);
      return;
    }

    try {
      const currentUser = await getUserById(userId);

      setUser(currentUser);
    } catch (error) {
      console.log("Failed to fetch user");

      localStorage.removeItem("userId");

      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const login = async (credentials) => {
    setIsLoading(true);

    try {
      const loggedInUser = await loginUser(
        credentials.email,
        credentials.password
      );

      localStorage.setItem("userId", loggedInUser.id);

      setUser(loggedInUser);

      return loggedInUser;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);

    try {
      const newUser = await registerUser(userData);

      return newUser;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("userId");

    setUser(null);
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  const checkUsername = async (username) => {
    const users = await checkUsernameApi(username);

    return users.length > 0;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated,
        fetchCurrentUser,
        checkUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}