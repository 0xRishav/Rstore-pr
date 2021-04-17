import { useContext } from "react";
import { Redirect, Route } from "react-router";
import { authContext } from "../contexts/authContext";

export default function PrivateRoute({ component, path, ...props }) {
  const { isUserLoggedIn } = useContext(authContext);
  const Component = component;
  return (
    <Route path={path} {...props}>
      {isUserLoggedIn ? (
        <Component />
      ) : (
        <Redirect
          replace
          to={{ pathname: "/signin", state: { from: path } }}
        />
      )}
    </Route>
  );
}
