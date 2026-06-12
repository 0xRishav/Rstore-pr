import { useContext } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiCalendar, FiLogOut } from "react-icons/fi";
import { useAuth } from "../../contexts/authContext";
import { useCart } from "../../contexts/CartContext";
import { useWishlist } from "../../contexts/WishlistContext";
import "./ProfilePage.css";

function ProfilePage() {
  const { currentUser, logoutUser } = useAuth();
  const { clearCart } = useCart();
  const { clearWishlist } = useWishlist();

  if (!currentUser || !currentUser.name) {
    return (
      <div className="profile-page profile-page--logged-out">
        <h2 className="profile-page__signin-title">Sign in to view your profile</h2>
        <p className="profile-page__signin-subtitle">You need to be signed in to access your profile.</p>
        <Link className="btn btn--primary btn--lg" to="/signin">
          Sign In
        </Link>
      </div>
    );
  }

  const handleSignOut = () => {
    logoutUser();
    clearCart();
    clearWishlist();
  };

  const memberSince = currentUser.createdAt
    ? new Date(currentUser.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-card__avatar">
          {currentUser.name[0].toUpperCase()}
        </div>
        <h1 className="profile-card__name">{currentUser.name}</h1>
        <p className="profile-card__email">
          <FiMail size={14} />
          {currentUser.email}
        </p>
        <p className="profile-card__joined">
          <FiCalendar size={14} />
          Member since {memberSince}
        </p>
      </div>

      <div className="profile-orders">
        <h2 className="profile-orders__title">Order History</h2>
        <div className="profile-orders__empty">
          <p>No orders yet</p>
          <Link to="/products" className="btn btn--secondary">
            Start Shopping
          </Link>
        </div>
      </div>

      <button className="btn btn--ghost profile-page__signout" onClick={handleSignOut}>
        <FiLogOut size={16} />
        Sign Out
      </button>
    </div>
  );
}

export default ProfilePage;
