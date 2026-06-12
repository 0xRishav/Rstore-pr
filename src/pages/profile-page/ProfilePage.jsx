import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../contexts/authContext";
import "./ProfilePage.css";

function ProfilePage() {
  const { currentUser } = useContext(authContext);
  if (!currentUser || !currentUser.name) {
    return (
      <div className="profilePage profilePage--loggedOut">
        <h2>Sign in to view your profile</h2>
        <Link className="blue-btn--primary" to="/signin">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="profilePage">
      <div
        className="profilePage__profileCircle"
        aria-label={`${currentUser.name}'s profile`}
      >
        {currentUser.name[0]}
      </div>
    </div>
  );
}

export default ProfilePage;
