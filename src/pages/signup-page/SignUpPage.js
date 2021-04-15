import React from "react";
import "./SignUpPage.css";

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="signup">
      <h2>Sign up to RStore</h2>
      <div className="signup__inputContainer">
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="username" placeholder="Username" />
        <input type="password" placeholder="Password" />
      </div>
    </div>
  );
}

export default SignUpPage;
