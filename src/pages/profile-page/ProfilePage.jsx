import React, { useContext } from "react";
import { authContext } from "../../contexts/authContext";
import "./ProfilePage.css";

function ProfilePage() {
  const { currentUser } = useContext(authContext);
  return (
    <div className="profilePage">
      {/* <h1>Welcome back, {currentUser.name[0]}</h1> */}
      <div className="profilePage__profileCircle">{currentUser.name[0]}</div>
    </div>
  );
}

export default ProfilePage;
