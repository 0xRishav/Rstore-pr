import { useContext, useEffect, useState, useRef } from "react";
import { BsBag, BsSearch } from "react-icons/bs";
import { AiOutlineClose, AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useWindowDimensions } from "../../custom-hooks";
import { useProduct } from "../../helpers";
import { useCart } from "../../contexts/CartContext";
import { useWishlist } from "../../contexts/WishlistContext";
import { authContext } from "../../contexts/authContext";
import NavbarSideMenu from "./NavbarSideMenu";
import { Button } from "../index";
import "./Navbar.css";

function Navbar() {
  const { products } = useProduct();
  const { cart, clearCart } = useCart();
  const { clearWishlist } = useWishlist();
  const { isUserLoggedIn, logoutUser, currentUser } = useContext(authContext);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get("category");

  const isMobile = width < 770;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchChange = (e) => setSearchInput(e.target.value);

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/products?q=${encodeURIComponent(searchInput)}`);
      setSearchInput("");
      setIsSideMenuOpen(false);
    }
  };

  const toggleMenu = () => setIsSideMenuOpen((v) => !v);
  const closeMenu = () => setIsSideMenuOpen(false);

  const handleSignOut = () => {
    logoutUser();
    closeMenu();
    clearCart();
    clearWishlist();
  };

  const navLinkClass = ({ isActive }) =>
    `navbar__link ${isActive ? "navbar__link--active" : ""}`;

  const productsLinkClass = ({ isActive }) =>
    `navbar__link ${isActive && !currentCategory ? "navbar__link--active" : ""}`;

  const categoryLinkClass = (cat) => ({ isActive }) =>
    `navbar__link ${isActive && currentCategory === cat ? "navbar__link--active" : ""}`;

  const userInitial = currentUser?.name?.charAt(0)?.toUpperCase() || "?";

  return (
    <>
      <header
        className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}
      >
        <div className="navbar__inner">
          <div className="navbar__left">
            {isMobile && (
              <Button
                variant="ghost"
                icon={isSideMenuOpen ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
                onClick={toggleMenu}
                aria-label={isSideMenuOpen ? "Close menu" : "Open menu"}
                className="navbar__hamburger"
              />
            )}

            <Link to="/" className="navbar__logo" onClick={closeMenu}>
              RStore
            </Link>

            {!isMobile && (
              <nav className="navbar__links">
                <NavLink to="/products" className={productsLinkClass}>
                  Products
                </NavLink>
                <NavLink to="/products?category=Mobiles" className={categoryLinkClass("Mobiles")}>
                  Mobile
                </NavLink>
                <NavLink to="/products?category=TV" className={categoryLinkClass("TV")}>
                  TV
                </NavLink>
                <NavLink to="/products?category=Laptop" className={categoryLinkClass("Laptop")}>
                  Laptop
                </NavLink>
                <NavLink to="/products?category=Watch" className={categoryLinkClass("Watch")}>
                  Watch
                </NavLink>
              </nav>
            )}
          </div>

          <div className="navbar__right">
            {!isMobile && (
              <div className="navbar__search">
                <BsSearch className="navbar__search-icon" size={14} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchInput}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchKeyDown}
                  className="navbar__search-input"
                />
              </div>
            )}

            <Link to="/cart" className="navbar__cart" onClick={closeMenu}>
              <BsBag size={20} />
              {cart.length > 0 && (
                <span className="navbar__cart-badge">{cart.length}</span>
              )}
            </Link>

            {!isMobile && (
              <>
                {isUserLoggedIn ? (
                  <Link to="/profile" className="navbar__avatar">
                    {userInitial}
                  </Link>
                ) : (
                  <Link to="/signin" className="btn btn--secondary btn--sm">
                    Sign In
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </header>

      {isMobile && isSideMenuOpen && (
        <NavbarSideMenu
          searchInput={searchInput}
          onSearchChange={handleSearchChange}
          onSearchKeyDown={handleSearchKeyDown}
          onLinkClick={closeMenu}
          onSignOut={handleSignOut}
          isUserLoggedIn={isUserLoggedIn}
          userInitial={userInitial}
          cartCount={cart.length}
        />
      )}
    </>
  );
}

export default Navbar;
