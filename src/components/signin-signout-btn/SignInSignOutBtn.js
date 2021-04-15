import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../contexts/authContext";
import "./SignInSignOutBtn.css";

function SignInSignOutBtn() {
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(
    authContext
  ).loginInfo;
  return (
    <Link to="/signin">
      <button className="blue-btn--primary">
        {isUserLoggedIn ? "Sign Out" : "Sign In"}
      </button>
    </Link>
  );
}

export default SignInSignOutBtn;
