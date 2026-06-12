import { Link, NavLink } from "react-router-dom";
import { BiSearch } from "react-icons/bi";

const categoryLinks = [
  { to: "/products", label: "All Products" },
  { to: "/category/Mobiles", label: "Mobile" },
  { to: "/category/TV", label: "TV" },
  { to: "/category/Laptop", label: "Laptop" },
  { to: "/category/Watch", label: "Watch" },
  { to: "/wishlist", label: "Wishlist" },
];

function NavbarSideMenu({
  filteredProducts,
  handleSearchInputChange,
  handleSearchKeyPress,
  sideNavLinkClickHandler,
  signoutBtnHandler,
  isUserLoggedIn,
}) {
  return (
    <div className="Navbar__sideMenu">
      <nav className="Navbar__sideMenuNav">
        <div className="Navbar__searchInputContainer">
          <input
            type="text"
            className="Navbar__searchInput"
            placeholder="Search..."
            onChange={handleSearchInputChange}
            onKeyPress={handleSearchKeyPress}
          />
          <Link
            to={{ pathname: "/search", state: { filteredProducts } }}
            className="Navbar__searchInputIcon"
            onClick={sideNavLinkClickHandler}
          >
            <BiSearch className="Navbar__searchInputIcon" color="#6e6e73" />
          </Link>
        </div>
        <div className="Navbar__sideMenu--linkWrapper">
          {categoryLinks.map(({ to, label }) => (
            <div key={to}>
              <div className="Navbar__sideMenu--linkContainer">
                <NavLink
                  to={to}
                  onClick={sideNavLinkClickHandler}
                  className={({ isActive }) =>
                    isActive ? "Navbar__Link Navbar__activeLink" : "Navbar__Link"
                  }
                >
                  {label}
                </NavLink>
              </div>
              <div className="hr-div"></div>
            </div>
          ))}
          <div className="Navbar__sideMenu--linkContainer">
            {isUserLoggedIn ? (
              <NavLink
                to="/"
                className="Navbar__Link"
                onClick={signoutBtnHandler}
              >
                Sign Out
              </NavLink>
            ) : (
              <NavLink to="/signin" className="Navbar__Link">
                Sign In
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavbarSideMenu;
