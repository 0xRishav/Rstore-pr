import React, { useContext, useEffect, useMemo, useState, useRef } from "react";
import "./Navbar.css";
import { BsBag } from "react-icons/bs";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useWindowDimensions } from "../../custom-hooks";
import { IoReorderTwoOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { useProduct } from "../../helpers";
import { useCart } from "../../contexts/CartContext";
import { useWishlist } from "../../contexts/WishlistContext";
import { authContext } from "../../contexts/authContext";
import NavbarSideMenu from "./NavbarSideMenu";

function Navbar() {
  const { products } = useProduct();
  const { cart, clearCart } = useCart();
  const { clearWishlist } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const { width } = useWindowDimensions();
  const navbarRef = useRef(null);
  const { isUserLoggedIn, logoutUser } = useContext(authContext);
  const signoutBtnHandler = () => {
    if (isUserLoggedIn) {
      logoutUser();
    }
    setIsSideMenuOpen(!isSideMenuOpen);
    clearCart();
    clearWishlist();
  };

  const serchClickHandler = () => {
    setIsSearchClicked(true);
  };

  const transitionNavbar = () => {
    if (window.scrollY > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavbar);

    return () => {
      window.removeEventListener("scroll", transitionNavbar);
    };
  }, []);

  let navigate = useNavigate();

  const handleMenuClick = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const sideNavLinkClickHandler = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        if (
          product.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchInput.toLowerCase()) ||
          product.category.toLowerCase().includes(searchInput.toLowerCase())
        ) {
          return product;
        }
      }),
    [products, searchInput],
  );

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      navigate("/search", { state: { filteredProducts } });
      setIsSideMenuOpen(false);
    }
  };

  return (
    <div
      className={
        isScrolled === false
          ? "Navbar__wrapper"
          : isSideMenuOpen === true
          ? "Navbar__wrapper"
          : "Navbar__wrapper Navbar__wrapper--scrolled"
      }
    >
      {isSideMenuOpen && width < 770 && (
        <NavbarSideMenu
          filteredProducts={filteredProducts}
          handleSearchInputChange={handleSearchInputChange}
          handleSearchKeyPress={handleSearchKeyPress}
          sideNavLinkClickHandler={sideNavLinkClickHandler}
          signoutBtnHandler={signoutBtnHandler}
          isUserLoggedIn={isUserLoggedIn}
        />
      )}
      <div className="Navbar" ref={navbarRef}>
        {width < 770 && (
          <>
            {isSideMenuOpen ? (
              <AiOutlineClose
                onClick={handleMenuClick}
                className="Navbar__toggleIcon"
                color="white"
              />
            ) : (
              <IoReorderTwoOutline
                onClick={handleMenuClick}
                className="Navbar__toggleIcon"
                color="white"
              />
            )}
          </>
        )}
        <NavLink to="/" className="Navbar__logo">
          <div>RStore</div>
        </NavLink>

        {width > 770 ? (
          <>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? "Navbar__Link Navbar__activeLink" : "Navbar__Link"
              }
            >
              All Products
            </NavLink>
            <NavLink
              to="/category/Mobiles"
              className={({ isActive }) =>
                isActive ? "Navbar__Link Navbar__activeLink" : "Navbar__Link"
              }
            >
              Mobile
            </NavLink>
            <NavLink
              to="/category/TV"
              className={({ isActive }) =>
                isActive ? "Navbar__Link Navbar__activeLink" : "Navbar__Link"
              }
            >
              TV
            </NavLink>
            <NavLink
              to="/category/Laptop"
              className={({ isActive }) =>
                isActive ? "Navbar__Link Navbar__activeLink" : "Navbar__Link"
              }
            >
              Laptop
            </NavLink>
            <NavLink
              to="/category/Watch"
              className={({ isActive }) =>
                isActive ? "Navbar__Link Navbar__activeLink" : "Navbar__Link"
              }
            >
              Watch
            </NavLink>
            <NavLink
              to="/wishlist"
              className={({ isActive }) =>
                isActive ? "Navbar__Link Navbar__activeLink" : "Navbar__Link"
              }
            >
              Wishlist
            </NavLink>
            <div className="Navbar__Link" onClick={serchClickHandler}>
              {!isSearchClicked && (
                <AiOutlineSearch className="Navbar__searchIcon" />
              )}
              {isSearchClicked && (
                <div className="Navbar__searchboxWrapper">
                  <input
                    type="text"
                    placeholder="Search here..."
                    className="Navbar__searchbox"
                    onChange={handleSearchInputChange}
                    onKeyPress={handleSearchKeyPress}
                  />
                  <Link
                    to={{
                      pathname: "/search",
                      state: { filteredProducts: filteredProducts },
                    }}
                    className="Navbar__desktopSearchLink"
                  >
                    <AiOutlineSearch className="Navbar__searchIcon" />
                  </Link>
                </div>
              )}
            </div>
          </>
        ) : null}
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? "Navbar__Link Navbar__activeLink" : "Navbar__Link"
          }
        >
          <BsBag />
          <span className="Navbar__productCount">{cart.length}</span>
        </NavLink>
        {width > 770 && (
          <NavLink
            to={isUserLoggedIn ? "/products" : "/signin"}
            className="Navbar__Link"
            onClick={signoutBtnHandler}
          >
            {isUserLoggedIn ? "Sign Out" : "Sign In"}
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default Navbar;
