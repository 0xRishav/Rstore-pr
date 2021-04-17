import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import useLocalStorage from "../custom-hooks/useLocalStorage";
import { fakeAuthAPI } from "../helpers";

export const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [users, setUsers] = useLocalStorage("users", []);
  const [currentUser, setCurrentUser] = useLocalStorage("currentUser", false);

  useEffect(() => {
    if (currentUser) {
      setIsUserLoggedIn(true);
    }
  }, []);

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const signUpUser = (name, email, password) => {
    setUsers([...users, { name, email, password }]);
    setCurrentUser({ name, email, password });
  };

  async function loginWithCredentials(email, password) {
    try {
      const response = await fakeAuthAPI(email, password, users);
      if (response.success === true) {
        const user = users.find((user) => user.email === email);
        setCurrentUser(user);
        setIsUserLoggedIn(true);
        // return response;
        return response;
      }
    } catch (err) {
      console.log(err);
      // return response;
    }
  }
  return (
    <authContext.Provider
      value={{
        isUserLoggedIn,
        setIsUserLoggedIn,
        loginWithCredentials,
        signUpUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
