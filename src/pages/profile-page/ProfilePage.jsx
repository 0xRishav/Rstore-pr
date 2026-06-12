import React, { useContext } from "react";
import { authContext } from "../../contexts/authContext";
import "./ProfilePage.css";

function ProfilePage() {
  const { currentUser } = useContext(authContext);
  if (!currentUser || !currentUser.name) return null;

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
