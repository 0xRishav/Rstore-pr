import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./SignInPage.css";
import { authContext } from "../../contexts/authContext";
import { Loader } from "../../components";

function SignInPage() {
  const { loginWithCredentials } = useContext(authContext);
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();

  async function signinHandler() {
    setIsLoading(true);
    const response = await loginWithCredentials(email, password);
    if (response.success) {
      navigate(state?.from ? state.from : "/");
    } else {
      setError(response.message);
    }
    setIsLoading(false);
  }

  const demoAccountClickHandler = async () => {
    setIsLoading(true);
    const response = await loginWithCredentials(
      "testuser100@gmail.com",
      "123456"
    );
    if (response.success) {
      navigate(state?.from ? state.from : "/");
    } else {
      setError(response.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="signin">
      {isLoading && <Loader />}
      {error && <div className="error-message">{error}</div>}
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
        className="blue-btn--primary signin__btn--primary"
        onClick={signinHandler}
      >
        Sign in
      </button>

      <h3>OR</h3>

      <button
        className="blue-btn--secondary signin__btn--secondary"
        onClick={demoAccountClickHandler}
      >
        Use Demo Account
      </button>
      <div className="signin__bottomLink">
        <Link className="signin__link" to="/signup">
          Do not have an RStore account?
        </Link>
      </div>
    </div>
  );
}

export default SignInPage;
