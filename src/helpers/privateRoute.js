import { useContext } from "react";
import { Redirect, Route } from "react-router";
import { authContext } from "../contexts/authContext";

export default function PrivateRoute({ component, ...props }) {
  const { isUserLoggedIn } = useContext(authContext).loginInfo;
  return (
    <Route {...props}>
      {isUserLoggedIn ? <component /> : <Redirect replace to="/signin" />}
    </Route>
  );
}
