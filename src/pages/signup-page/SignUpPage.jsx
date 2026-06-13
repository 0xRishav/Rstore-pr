import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";
import { useAuth } from "../../contexts/authContext";
import { Button } from "../../components";
import "./SignUpPage.css";

function SignUpPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Enter a valid email";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "At least 6 characters";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setIsLoading(true);
    const response = await signUp(name, email, password);
    if (response.success) {
      navigate("/signin");
    } else {
      setErrors({ form: response.message || "Something went wrong" });
    }
    setIsLoading(false);
  };

  const handleBlur = (field) => {
    const allErrors = validate();
    if (allErrors[field]) {
      setErrors((prev) => ({ ...prev, [field]: allErrors[field] }));
    } else {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-page__inner">
        <h1 className="signup-page__title">Create your account</h1>

        <form className="signup-page__form" onSubmit={handleSubmit}>
          {errors.form && (
            <div className="signup-page__banner-error">
              <FiAlertCircle size={14} />
              <span>{errors.form}</span>
            </div>
          )}

          <div className="input-field">
            <input
              className={`input-field__input ${errors.name ? "input-field__input--error" : ""}`}
              type="text"
              id="name"
              placeholder=" "
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => handleBlur("name")}
              autoComplete="name"
            />
            <label className="input-field__label" htmlFor="name">Name</label>
            {errors.name && <span className="input-field__error">{errors.name}</span>}
          </div>

          <div className="input-field">
            <input
              className={`input-field__input ${errors.email ? "input-field__input--error" : ""}`}
              type="email"
              id="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur("email")}
              autoComplete="email"
            />
            <label className="input-field__label" htmlFor="email">Email</label>
            {errors.email && <span className="input-field__error">{errors.email}</span>}
          </div>

          <div className="input-field">
            <input
              className={`input-field__input ${errors.password ? "input-field__input--error" : ""}`}
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur("password")}
              autoComplete="new-password"
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
            {errors.password && <span className="input-field__error">{errors.password}</span>}
          </div>

          <Button
            variant="primary"
            type="submit"
            loading={isLoading}
            className="signup-page__btn"
          >
            Create Account
          </Button>
        </form>

        <p className="signup-page__footer">
          Already have an account?{" "}
          <Link to="/signin" className="signup-page__link">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
