import React, { useContext, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./SignInPage.css";
import { BsArrowUpRight } from "react-icons/bs";
import { authContext } from "../../contexts/authContext";

function SignInPage() {
  const { loginWithCredentials } = useContext(authContext);
  const { state } = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  async function signinHandler() {
    const response = await loginWithCredentials(email, password);
    if (response.success) {
      history.push(state?.from ? state.from : "/");
    }
  }

  console.log({ state });

  return (
    <div className="signin">
      <h2>Sign in to RStore</h2>
      <div className="signin__inputContainer">
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="blue-btn--primary" onClick={signinHandler}>
        Sign in
      </button>
      <div>
        Do not have an RStore account?{" "}
        <Link to="/signup">
          Create yours now <BsArrowUpRight />{" "}
        </Link>
      </div>
    </div>
  );
}

export default SignInPage;
