import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { Loader } from "../../components";
import { authContext } from "../../contexts/authContext";
import useLocalStorage from "../../custom-hooks/useLocalStorage";
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

  let history = useHistory();

  const handleSignUpClick = async () => {
    if (isNameValid && isPasswordValid && isEmailValid) {
      setIsLoading(true);
      try {
        const res = await signUpUser(name, email, password);
        if (res.success) {
          history.push("/signin");
        }
      } catch (err) {
        console.log(err);
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

  const validateSignUp = () => {};

  return (
    <div className="signup">
      {isLoading && <Loader />}
      <h2>Sign up to RStore</h2>
      <div className="signup__inputContainer">
        <input type="text" placeholder="Name" onChange={nameChangeHandler} />
        {!isNameValid && <div>Enter valid Name</div>}
        <input type="email" placeholder="Email" onChange={emailChangeHandler} />
        {!isEmailValid && <div>Enter valid Email</div>}
        <input
          type="password"
          placeholder="Password"
          onChange={passwordChangeHandler}
        />
        {!isPasswordValid && <div>Enter valid Password</div>}
      </div>
      <button className="blue-btn--primary" onClick={handleSignUpClick}>
        Sign up
      </button>
    </div>
  );
}

export default SignUpPage;
