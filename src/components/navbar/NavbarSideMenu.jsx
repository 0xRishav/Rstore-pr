import { Link, NavLink } from "react-router-dom";
import { BsSearch, BsBag, BsBoxArrowRight, BsPerson } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

const menuLinks = [
  { to: "/products", label: "All Products" },
  { to: "/category/Mobiles", label: "Mobile" },
  { to: "/category/TV", label: "TV" },
  { to: "/category/Laptop", label: "Laptop" },
  { to: "/category/Watch", label: "Watch" },
  { to: "/wishlist", label: "Wishlist" },
];

function NavbarSideMenu({
  filteredProducts,
  searchInput,
  onSearchChange,
  onSearchKeyDown,
  onLinkClick,
  onSignOut,
  isUserLoggedIn,
  userInitial,
  cartCount,
}) {
  return (
    <div className="side-menu">
      <div className="side-menu__overlay" onClick={onLinkClick} />

      <div className="side-menu__panel">
        <div className="side-menu__search">
          <BsSearch className="side-menu__search-icon" size={16} />
          <input
            className="side-menu__search-input"
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={onSearchChange}
            onKeyDown={onSearchKeyDown}
            autoFocus
          />
        </div>

        <nav className="side-menu__nav">
          {menuLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onLinkClick}
              className={({ isActive }) =>
                `side-menu__link ${isActive ? "side-menu__link--active" : ""}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="side-menu__bottom">
          {isUserLoggedIn ? (
            <>
              <Link to="/profile" className="side-menu__profile" onClick={onLinkClick}>
                <span className="side-menu__avatar">{userInitial}</span>
                <span>Profile</span>
              </Link>
              <Link to="/cart" className="side-menu__cart-row" onClick={onLinkClick}>
                <BsBag size={18} />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="side-menu__cart-badge">{cartCount}</span>
                )}
              </Link>
              <button className="side-menu__signout" onClick={onSignOut}>
                <BsBoxArrowRight size={18} />
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to="/signin"
              className="btn btn--primary btn--full"
              onClick={onLinkClick}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavbarSideMenu;
