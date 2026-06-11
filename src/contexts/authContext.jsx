import api from "../api/client";
import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "../custom-hooks/useLocalStorage";

export const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useLocalStorage("currentUser", false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setIsUserLoggedIn(true);
    }
  }, []);

  const signUpUser = async (name, email, password) => {
    try {
      const res = await api.post("/api/auth/signup", {
        name,
        email,
        password,
      });
      return { success: res.data.success, message: res.data.message };
    } catch (err) {
      console.log(err);
      return { success: false, message: "Sign up failed" };
    }
  };

  const loginWithCredentials = async (email, password) => {
    try {
      const response = await api.post("/api/auth/signin", { email, password });
      if (response.data.success) {
        localStorage.setItem("token", response.data.data.token);
        setCurrentUser(response.data.data.user);
        setIsUserLoggedIn(true);
        return { success: true };
      }
      return { success: false, message: response.data.message };
    } catch (err) {
      console.log(err);
      return { success: false, message: "Login failed" };
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setCurrentUser(false);
    setIsUserLoggedIn(false);
  };

  return (
    <authContext.Provider
      value={{
        isUserLoggedIn,
        loginWithCredentials,
        signUpUser,
        currentUser,
        logoutUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};
