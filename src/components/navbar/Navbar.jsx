import React, { useContext, useEffect, useState, useRef } from "react";
import "./Navbar.css";
import { BsBag } from "react-icons/bs";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useWindowDimensions } from "../../custom-hooks";
import { IoReorderTwoOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import useProduct from "../../helpers/useProducts";
import { FaUserAlt } from "react-icons/fa";
import { authContext } from "../../contexts/authContext";

function Navbar() {
  const { products, cart, dispatch } = useProduct();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const { width } = useWindowDimensions();
  const navbarRef = useRef(null);
  const { isUserLoggedIn, logoutUser } = useContext(authContext);
  const [cartCount, setCartCount] = useState(0);

  const signoutBtnHandler = () => {
    if (isUserLoggedIn) {
      logoutUser();
    }
    setIsSideMenuOpen(!isSideMenuOpen);
    dispatch({ type: "CLEAR_USER_STATE" });
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

  // let cartCount = 0;
  const cartCountReducer = (acc, val) => {
    return acc + val.quantity;
  };

  const getCartCount = () => {
    return products
      .filter((ele) => ele.isInCart === true)
      .reduce(cartCountReducer, 0);
  };

  const handleMenuClick = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  useEffect(() => {
    setCartCount(getCartCount());
  }, [products]);

  const sideNavLinkClickHandler = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    if (
      product.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchInput.toLowerCase()) ||
      product.category.toLowerCase().includes(searchInput.toLowerCase())
    ) {
      return product;
    }
  });

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
          ? "navbar__wrapper"
          : isSideMenuOpen === true
          ? "navbar__wrapper"
          : "navbar__wrapper navbar__wrapper--scrolled"
      }
    >
      {isSideMenuOpen && width < 770 && (
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
                to={{
                  pathname: "/search",
                  state: { filteredProducts: filteredProducts },
                }}
                className="Navbar__searchInputIcon"
                onClick={() => setIsSideMenuOpen(false)}
              >
                <BiSearch className="Navbar__searchInputIcon" color="#6e6e73" />
              </Link>
            </div>
            <div className="Navbar__sideMenu--linkWrapper">
              <div
                className="Navbar__sideMenu--linkContainer"
                style={{ marginTop: "32px" }}
              >
                <NavLink
                  to="/products"
                  onClick={sideNavLinkClickHandler}
                  className={({ isActive }) =>
                    isActive ? "navbar__Link Navbar__activeLink" : "navbar__Link"
                  }
                >
                  All Products
                </NavLink>
              </div>

              <div className="hr-div"></div>
              <div className="Navbar__sideMenu--linkContainer">
                <NavLink
                  to="/mobile"
                  onClick={sideNavLinkClickHandler}
                  className={({ isActive }) =>
                    isActive ? "navbar__Link Navbar__activeLink" : "navbar__Link"
                  }
                >
                  Mobile
                </NavLink>
              </div>

              <div className="hr-div"></div>
              <div className="Navbar__sideMenu--linkContainer">
                <NavLink
                  to="/tv"
                  onClick={sideNavLinkClickHandler}
                  className={({ isActive }) =>
                    isActive ? "navbar__Link Navbar__activeLink" : "navbar__Link"
                  }
                >
                  TV
                </NavLink>
              </div>

              <div className="hr-div"></div>
              <div className="Navbar__sideMenu--linkContainer">
                <NavLink
                  to="/laptop"
                  onClick={sideNavLinkClickHandler}
                  className={({ isActive }) =>
                    isActive ? "navbar__Link Navbar__activeLink" : "navbar__Link"
                  }
                >
                  Laptop
                </NavLink>
              </div>

              <div className="hr-div"></div>
              <div className="Navbar__sideMenu--linkContainer">
                <NavLink
                  to="/watch"
                  onClick={sideNavLinkClickHandler}
                  className={({ isActive }) =>
                    isActive ? "navbar__Link Navbar__activeLink" : "navbar__Link"
                  }
                >
                  Watch
                </NavLink>
              </div>

              <div className="hr-div"></div>
              <div className="Navbar__sideMenu--linkContainer">
                <NavLink
                  to="/wishlist"
                  onClick={sideNavLinkClickHandler}
                  className={({ isActive }) =>
                    isActive ? "navbar__Link Navbar__activeLink" : "navbar__Link"
                  }
                >
                  Wishlist
                </NavLink>
              </div>

              <div className="hr-div"></div>
              <div className="Navbar__sideMenu--linkContainer">
                {isUserLoggedIn ? (
                  <NavLink
                    to="/"
                    className="navbar__Link"
                    onClick={signoutBtnHandler}
                  >
                    Sign Out
                  </NavLink>
                ) : (
                  <NavLink to="/signin" className="navbar__Link">
                    Sign In
                  </NavLink>
                )}
              </div>
            </div>
          </nav>
        </div>
      )}
      <div className="navbar" ref={navbarRef}>
        {width < 770 && (
          <>
            {isSideMenuOpen ? (
              <AiOutlineClose
                onClick={handleMenuClick}
                style={{ cursor: "pointer" }}
                color="white"
              />
            ) : (
              <IoReorderTwoOutline
                onClick={handleMenuClick}
                style={{ cursor: "pointer" }}
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
                isActive ? "navbar__Link Navbar__activeLink" : "navbar__Link"
              }
            >
              All Products
            </NavLink>
            <NavLink
              to="/mobile"
              className={({ isActive }) =>
                isActive ? "navbar__Link Navbar__activeLink" : "navbar__Link"
              }
            >
              Mobile
            </NavLink>
            <NavLink
              to="/tv"
              className={({ isActive }) =>
                isActive ? "navbar__Link Navbar__activeLink" : "navbar__Link"
              }
            >
              TV
            </NavLink>
            <NavLink
              to="/laptop"
              className={({ isActive }) =>
                isActive ? "navbar__Link Navbar__activeLink" : "navbar__Link"
              }
            >
              Laptop
            </NavLink>
            <NavLink
              to="/watch"
              className={({ isActive }) =>
                isActive ? "navbar__Link Navbar__activeLink" : "navbar__Link"
              }
            >
              Watch
            </NavLink>
            <NavLink
              to="/wishlist"
              className={({ isActive }) =>
                isActive ? "navbar__Link Navbar__activeLink" : "navbar__Link"
              }
            >
              Wishlist
            </NavLink>
            <div className="navbar__Link" onClick={serchClickHandler}>
              {!isSearchClicked && (
                <AiOutlineSearch className="navbar__searchIcon" />
              )}
              {isSearchClicked && (
                <div className="navbar__searchboxWrapper">
                  <input
                    type="text"
                    placeholder="Search here..."
                    className="navbar__searchbox"
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
                    <AiOutlineSearch className="navbar__searchIcon" />
                  </Link>
                </div>
              )}
            </div>
          </>
        ) : null}
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? "navbar__Link Navbar__activeLink" : "navbar__Link"
          }
        >
          <BsBag />
          <span className="navbar__productCount">{cart.length}</span>
        </NavLink>
        {width > 770 && (
          <NavLink
            to={isUserLoggedIn ? "/products" : "/signin"}
            className="navbar__Link"
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
