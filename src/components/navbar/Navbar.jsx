import { useContext, useEffect, useMemo, useState, useRef } from "react";
import { BsBag, BsSearch } from "react-icons/bs";
import { AiOutlineClose, AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useWindowDimensions } from "../../custom-hooks";
import { useProduct } from "../../helpers";
import { useCart } from "../../contexts/CartContext";
import { useWishlist } from "../../contexts/WishlistContext";
import { authContext } from "../../contexts/authContext";
import NavbarSideMenu from "./NavbarSideMenu";
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

  const isMobile = width < 770;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const q = searchInput.toLowerCase();
        return (
          product.name.toLowerCase().includes(q) ||
          product.brand.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q)
        );
      }),
    [products, searchInput]
  );

  const handleSearchChange = (e) => setSearchInput(e.target.value);

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate("/search", { state: { filteredProducts } });
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

  const userInitial = currentUser?.name?.charAt(0)?.toUpperCase() || "?";

  return (
    <>
      <header
        className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}
      >
        <div className="navbar__inner">
          <div className="navbar__left">
            {isMobile && (
              <button
                className="navbar__hamburger"
                onClick={toggleMenu}
                aria-label={isSideMenuOpen ? "Close menu" : "Open menu"}
              >
                {isSideMenuOpen ? (
                  <AiOutlineClose size={20} />
                ) : (
                  <AiOutlineMenu size={20} />
                )}
              </button>
            )}

            <Link to="/" className="navbar__logo" onClick={closeMenu}>
              RStore
            </Link>

            {!isMobile && (
              <nav className="navbar__links">
                <NavLink to="/products" className={navLinkClass}>
                  Products
                </NavLink>
                <NavLink to="/category/Mobiles" className={navLinkClass}>
                  Mobile
                </NavLink>
                <NavLink to="/category/TV" className={navLinkClass}>
                  TV
                </NavLink>
                <NavLink to="/category/Laptop" className={navLinkClass}>
                  Laptop
                </NavLink>
                <NavLink to="/category/Watch" className={navLinkClass}>
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
                  className="navbar__search-input"
                  type="text"
                  placeholder="Search products..."
                  value={searchInput}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchKeyDown}
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
          filteredProducts={filteredProducts}
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
