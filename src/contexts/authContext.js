import { createContext, useState } from "react";

export const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  return (
    <authContext.Provider
      value={{ loginInfo: { isUserLoggedIn, setIsUserLoggedIn } }}
    >
      {children}
    </authContext.Provider>
  );
};
