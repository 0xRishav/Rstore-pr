import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../contexts/authContext";

export default function PrivateRoute({ children }) {
  const { isUserLoggedIn } = useContext(authContext);
  if (!isUserLoggedIn) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}
