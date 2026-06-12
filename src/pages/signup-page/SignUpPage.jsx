import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUserPlus, FiAlertCircle } from "react-icons/fi";
import { useAuth } from "../../contexts/authContext";
import "./SignUpPage.css";

function SignUpPage() {
  const navigate = useNavigate();
  const { signUpUser } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name || name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    const emailRE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email || !emailRE.test(String(email).toLowerCase())) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!password || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsLoading(true);
    try {
      const res = await signUpUser(name, email, password);
      if (res.success) {
        navigate("/signin");
      } else {
        setErrors({ form: res.message || "Sign up failed. Please try again." });
      }
    } catch (err) {
      setErrors({ form: err?.response?.data?.message || err.message || "Sign up failed" });
    }
    setIsLoading(false);
  };

  return (
    <div className="signup-page">
      <div className="auth-card">
        <div className="auth-card__accent-bar" />

        <div className="auth-card__header">
          <div className="auth-card__icon">
            <FiUserPlus size={24} />
          </div>
          <h1 className="auth-card__title">Create an account</h1>
          <p className="auth-card__subtitle">Get started with RStore</p>
        </div>

        <form className="auth-card__form" onSubmit={handleSubmit}>
          {errors.form && (
            <div className="auth-card__banner-error">
              <FiAlertCircle size={14} />
              <span>{errors.form}</span>
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="signup-name">Name</label>
            <input
              className={`form-input ${errors.name ? "form-input--error" : ""}`}
              type="text"
              id="signup-name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
            {errors.name && (
              <p className="form-error">
                <FiAlertCircle size={12} />
                {errors.name}
              </p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="signup-email">Email</label>
            <input
              className={`form-input ${errors.email ? "form-input--error" : ""}`}
              type="email"
              id="signup-email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            {errors.email && (
              <p className="form-error">
                <FiAlertCircle size={12} />
                {errors.email}
              </p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="signup-password">Password</label>
            <input
              className={`form-input ${errors.password ? "form-input--error" : ""}`}
              type="password"
              id="signup-password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
            {errors.password && (
              <p className="form-error">
                <FiAlertCircle size={12} />
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn--primary btn--full btn--lg"
            disabled={isLoading}
          >
            {isLoading ? <span className="btn-spinner" /> : "Create Account"}
          </button>
        </form>

        <p className="auth-card__footer">
          Already have an account?{" "}
          <Link to="/signin" className="auth-card__link">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
