import React, { useContext, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./SignInPage.css";
import { BsArrowUpRight } from "react-icons/bs";
import { authContext } from "../../contexts/authContext";
import { Loader } from "../../components";

function SignInPage() {
  const { loginWithCredentials } = useContext(authContext);
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  async function signinHandler() {
    setIsLoading(true);
    const response = await loginWithCredentials(email, password);
    if (response.data.success) {
      history.push(state?.from ? state.from : "/");
    } else {
      console.log(response.message);
    }
    setIsLoading(false);
  }

  const demoAccountClickHandler = async () => {
    setIsLoading(true);
    const response = await loginWithCredentials(
      "testuser310@gmail.com",
      "123456"
    );
    if (response.data.success) {
      history.push(state?.from ? state.from : "/");
    } else {
      console.log(response.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="signin">
      {isLoading && <Loader />}
      <h2>Sign in to RStore</h2>
      <div className="signin__inputContainer">
        <div className="Signin__input-field">
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="Signin__input"
            id="email"
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="Signin__input-field">
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="Signin__input"
            id="password"
          />
          <label htmlFor="password">Password</label>
        </div>
      </div>
      <button
        className="blue-btn--primary"
        style={{ padding: "0.8rem 4rem", margin: "auto" }}
        onClick={signinHandler}
      >
        Sign in
      </button>

      <h3>OR</h3>

      <button
        className="blue-btn--secondary"
        style={{ padding: "0.8rem 2rem", margin: "auto" }}
        onClick={demoAccountClickHandler}
      >
        Use Demo Account
      </button>
      <div style={{ marginTop: "2rem" }}>
        <Link
          style={{
            textDecoration: "none",

            fontWeight: "600",
          }}
          to="/signup"
        >
          Do not have an RStore account?
        </Link>
      </div>
    </div>
  );
}

export default SignInPage;
