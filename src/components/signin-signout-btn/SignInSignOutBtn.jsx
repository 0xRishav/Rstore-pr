import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../contexts/authContext";
import "./SignInSignOutBtn.css";

function SignInSignOutBtn() {
  const { isUserLoggedIn, logoutUser } = useContext(authContext);
  const signinBtnHandler = () => {
    if (isUserLoggedIn) {
      logoutUser();
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
