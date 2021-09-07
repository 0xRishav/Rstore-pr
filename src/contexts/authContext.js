import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import useLocalStorage from "../custom-hooks/useLocalStorage";
import { fakeAuthAPI } from "../helpers";

export const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [users, setUsers] = useLocalStorage("users", []);
  const [currentUser, setCurrentUser] = useLocalStorage("currentUser", false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setIsUserLoggedIn(true);
    }
  }, []);

  const signUpUser = async (name, email, password) => {
    try {
      const res = await axios.post(
        "https://rstoreapi.herokuapp.com/users/signup",
        {
          name: name,
          email: email,
          password: password,
        }
      );
      if (res.data.success) {
        return { success: true, message: "user signed up" };
      } else {
        console.log("invalid email or password");
        return { success: false, message: "user sign up fail" };
      }
    } catch (err) {
      console.log(err);
    }
  };

  async function loginWithCredentials(email, password) {
    try {
      const response = await axios.post(
        "https://rstoreapi.herokuapp.com/users/signin",
        { email, password }
      );

      if (response.status === 200) {
        setCurrentUser(response.data.user);
        setIsUserLoggedIn(true);
        return response;
      } else {
        console.log("invalid login request");
        return { success: false, message: "invalid login request" };
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <authContext.Provider
      value={{
        isUserLoggedIn,
        setIsUserLoggedIn,
        loginWithCredentials,
        signUpUser,
        currentUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};
