import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";
import { useAuth } from "../../contexts/authContext";
import { Button, Input } from "../../components";
import "../../styles/floating-input.css";
import "./SignInPage.css";

function SignInPage() {
  const { loginWithCredentials } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    setError("");
    const response = await loginWithCredentials(email, password);
    if (response.success) {
      navigate(state?.from ? state.from : "/");
    } else {
      setError(response.message || "Invalid credentials");
    }
    setIsLoading(false);
  };

  const demoAccountClickHandler = async () => {
    setIsLoading(true);
    setError("");
    const response = await loginWithCredentials("testuser100@gmail.com", "123456");
    if (response.success) {
      navigate(state?.from ? state.from : "/");
    } else {
      setError(response.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="signin-page">
      <div className="signin-page__inner">
        <h1 className="signin-page__title">Sign in to RStore</h1>

        <form className="signin-page__form" onSubmit={handleSubmit}>
          {error && (
            <div className="signin-page__banner-error">
              <FiAlertCircle size={14} />
              <span>{error}</span>
            </div>
          )}

          <div className="input-field">
            <Input
              type="email"
              id="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="input-field__input"
            />
            <label className="input-field__label" htmlFor="email">Email</label>
          </div>

          <div className="input-field">
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="input-field__input"
            />
            <label className="input-field__label" htmlFor="password">Password</label>
            <button
              type="button"
              className="input-field__toggle"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>

          <Button
            variant="primary"
            type="submit"
            loading={isLoading}
            className="signin-page__btn"
          >
            Sign In
          </Button>
        </form>

        <div className="divider">
          <span className="divider__line" />
          <span className="divider__text">or</span>
          <span className="divider__line" />
        </div>

        <Button
          variant="secondary"
          onClick={demoAccountClickHandler}
          loading={isLoading}
          className="signin-page__btn"
        >
          Use Demo Account
        </Button>

        <p className="signin-page__footer">
          Don't have an account?{" "}
          <Link to="/signup" className="signin-page__link">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default SignInPage;
