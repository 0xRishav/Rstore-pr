import { Link, NavLink } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { Button } from "../index";

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
}) {
  return (
    <div className="side-menu">
      <div className="side-menu__search">
        <input
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={onSearchChange}
          onKeyDown={onSearchKeyDown}
          autoFocus
          className="side-menu__search-input"
        />
        <Link
          to={{ pathname: "/search", state: { filteredProducts } }}
          className="side-menu__search-link"
          onClick={onLinkClick}
        >
          <BiSearch size={18} />
        </Link>
      </div>

      <nav className="side-menu__nav">
        {menuLinks.map(({ to, label }) => (
          <div key={to}>
            <NavLink
              to={to}
              onClick={onLinkClick}
              className={({ isActive }) =>
                `side-menu__link ${isActive ? "side-menu__link--active" : ""}`
              }
            >
              {label}
            </NavLink>
            <div className="side-menu__divider" />
          </div>
        ))}

        <div className="side-menu__link">
          {isUserLoggedIn ? (
            <Button variant="ghost" onClick={onSignOut} className="side-menu__signout">
              Sign Out
            </Button>
          ) : (
            <Link to="/signin" className="side-menu__signin" onClick={onLinkClick}>
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}

export default NavbarSideMenu;
