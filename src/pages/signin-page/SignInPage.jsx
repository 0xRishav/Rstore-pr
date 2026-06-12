import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiLock, FiEye, FiEyeOff, FiAlertCircle, FiStar, FiGithub } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../contexts/authContext";
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
      <div className="auth-card">
        <div className="auth-card__accent-bar" />

        <div className="auth-card__header">
          <div className="auth-card__icon">
            <FiLock size={24} />
          </div>
          <h1 className="auth-card__title">Welcome back</h1>
          <p className="auth-card__subtitle">Sign in to your account to continue</p>
        </div>

        <form className="auth-card__form" onSubmit={handleSubmit}>
          {error && (
            <div className="auth-card__banner-error">
              <FiAlertCircle size={14} />
              <span>{error}</span>
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              className="form-input"
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <div className="input-password-wrapper">
              <input
                className="form-input"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="input-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn--primary btn--full btn--lg"
            disabled={isLoading}
          >
            {isLoading ? <span className="btn-spinner" /> : "Sign In"}
          </button>
        </form>

        <div className="divider">
          <span className="divider__line" />
          <span className="divider__text">or continue with</span>
          <span className="divider__line" />
        </div>

        <div className="social-buttons">
          <button type="button" className="btn btn--secondary btn--full btn--social">
            <FcGoogle size={20} />
            Continue with Google
          </button>
          <button type="button" className="btn btn--secondary btn--full btn--social">
            <FiGithub size={20} />
            Continue with GitHub
          </button>
        </div>

        <button
          type="button"
          className="btn btn--ghost btn--full demo-button"
          onClick={demoAccountClickHandler}
          disabled={isLoading}
        >
          <FiStar size={16} />
          Try demo account
        </button>

        <p className="auth-card__footer">
          Don't have an account?{" "}
          <Link to="/signup" className="auth-card__link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignInPage;
