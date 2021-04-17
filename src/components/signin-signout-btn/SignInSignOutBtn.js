import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { authContext } from "../../contexts/authContext";
import "./SignInSignOutBtn.css";

function SignInSignOutBtn() {
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(authContext);
  const signinBtnHandler = () => {
    if (isUserLoggedIn) {
      window.localStorage.removeItem("currentUser");
      setIsUserLoggedIn(!isUserLoggedIn);
    }
  };

  return (
    <Link to={isUserLoggedIn ? "#" : "/signin"}>
      <button className="blue-btn--primary" onClick={signinBtnHandler}>
        {isUserLoggedIn ? "Sign Out" : "Sign In"}
      </button>
    </Link>
  );
}

export default SignInSignOutBtn;
