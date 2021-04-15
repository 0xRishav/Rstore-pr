import React from "react";
import { Link } from "react-router-dom";
import "./SignInPage.css";
import { BsArrowUpRight } from "react-icons/bs";

function SignInPage() {
  return (
    <div className="signin">
      <h2>Sign in to RStore</h2>
      <div className="signin__inputContainer">
        <input type="username" placeholder="Username" />
        <input type="password" placeholder="Password" />
      </div>
      <button className="blue-btn--primary">Sign in</button>
      <div>
        Do not have an RStore account?{" "}
        <Link>
          Create yours now <BsArrowUpRight />{" "}
        </Link>
      </div>
    </div>
  );
}

export default SignInPage;
