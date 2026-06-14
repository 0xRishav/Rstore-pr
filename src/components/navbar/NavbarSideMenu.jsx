import { Link, NavLink, useSearchParams } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { Button } from "../index";

const menuLinks = [
  { to: "/products", label: "All Products" },
  { to: "/products?category=Mobiles", label: "Mobile" },
  { to: "/products?category=TV", label: "TV" },
  { to: "/products?category=Laptop", label: "Laptop" },
  { to: "/products?category=Watch", label: "Watch" },
  { to: "/wishlist", label: "Wishlist" },
];

function NavbarSideMenu({
  searchInput,
  onSearchChange,
  onSearchKeyDown,
  onLinkClick,
  onSignOut,
  isUserLoggedIn,
}) {
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get("category");
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
          to={`/products?q=${encodeURIComponent(searchInput)}`}
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
              end={to === "/products"}
              onClick={onLinkClick}
              className={({ isActive }) => {
                const cat = to.startsWith("/products?category=") ? to.split("=")[1] : null;
                const isActiveLink = cat
                  ? isActive && currentCategory === cat
                  : to === "/products"
                    ? isActive && !currentCategory
                    : isActive;
                return `side-menu__link ${isActiveLink ? "side-menu__link--active" : ""}`;
              }}
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
