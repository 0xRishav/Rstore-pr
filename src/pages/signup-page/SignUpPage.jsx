import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../../components";
import { authContext } from "../../contexts/authContext";
import "./SignUpPage.css";

function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { signUpUser } = useContext(authContext);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [error, setError] = useState("");

  let navigate = useNavigate();

  const handleSignUpClick = async () => {
    if (isNameValid && isPasswordValid && isEmailValid) {
      setIsLoading(true);
      try {
        const res = await signUpUser(name, email, password);
        if (res.success) {
          navigate("/signin");
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Sign up failed");
      }
    }
    setIsLoading(false);
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
    const emailRE =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    emailRE.test(String(e.target.value).toLowerCase())
      ? setIsEmailValid(true)
      : setIsEmailValid(false);
  };

  const nameChangeHandler = (e) => {
    setName(e.target.value);
    e.target.value === "" ? setIsNameValid(false) : setIsNameValid(true);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
    e.target.value === ""
      ? setIsPasswordValid(false)
      : setIsPasswordValid(true);
  };

  return (
    <div className="signup">
      {isLoading && <Loader />}
      {error && <div className="error-message">{error}</div>}
      <h2>Sign up to RStore</h2>
      <div className="signup__inputContainer">
        <div className="Signup__input-field">
          <input
            type="text"
            className="Signup__input"
            id="name"
            placeholder=" "
            onChange={nameChangeHandler}
          />
          <label htmlFor="name">Name</label>
        </div>
        {!isNameValid && <p className="Signup__validationMsg">Enter valid Name</p>}
        <div className="Signup__input-field">
          <input
            type="email"
            className="Signup__input"
            id="email"
            placeholder=" "
            onChange={emailChangeHandler}
          />
          <label htmlFor="email">Email</label>
        </div>
        {!isEmailValid && <p className="Signup__validationMsg">Enter valid Email</p>}
        <div className="Signup__input-field">
          <input
            type="password"
            className="Signup__input"
            id="password"
            placeholder=" "
            onChange={passwordChangeHandler}
          />
          <label htmlFor="password">Password</label>
        </div>
        {!isPasswordValid && <p className="Signup__validationMsg">Enter valid Password</p>}
      </div>
      <button className="blue-btn--primary" style={{ padding: "0.8rem 4rem", margin: "auto" }} onClick={handleSignUpClick}>
        Sign up
      </button>
      <div style={{ marginTop: "2rem" }}>
        <Link
          style={{
            textDecoration: "none",
            fontWeight: "600",
          }}
          to="/signin"
        >
          Already have an RStore account?
        </Link>
      </div>
    </div>
  );
}

export default SignUpPage;
