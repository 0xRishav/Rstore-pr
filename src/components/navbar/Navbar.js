import React, { useContext, useEffect, useState, useRef } from "react";
import "./Navbar.css";
import { BsBag } from "react-icons/bs";
import { ProductsContext } from "../../contexts/productsContext";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useWindowDimensions } from "../../custom-hooks";
import { IoReorderTwoOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import useProduct from "../../helpers/useProducts";

function Navbar() {
  const { products, dispatch } = useProduct();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const { height, width } = useWindowDimensions();
  const navbarRef = useRef(null);

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

  let cartCount = 0;
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

  cartCount = getCartCount();

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

  return (
    <div
      className={
        isScrolled === false
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
                  className="navbar__Link"
                  onClick={sideNavLinkClickHandler}
                  activeClassName="Navbar__activeLink"
                >
                  All Products
                </NavLink>
              </div>

              <div className="hr-div"></div>
              <div className="Navbar__sideMenu--linkContainer">
                <NavLink
                  to="/mobile"
                  className="navbar__Link"
                  activeClassName="Navbar__activeLink"
                  onClick={sideNavLinkClickHandler}
                >
                  Mobile
                </NavLink>
              </div>

              <div className="hr-div"></div>
              <div className="Navbar__sideMenu--linkContainer">
                <NavLink
                  to="/tv"
                  className="navbar__Link"
                  activeClassName="Navbar__activeLink"
                  onClick={sideNavLinkClickHandler}
                >
                  TV
                </NavLink>
              </div>

              <div className="hr-div"></div>
              <div className="Navbar__sideMenu--linkContainer">
                <NavLink
                  to="/laptop"
                  className="navbar__Link"
                  activeClassName="Navbar__activeLink"
                  onClick={sideNavLinkClickHandler}
                >
                  Laptop
                </NavLink>
              </div>

              <div className="hr-div"></div>
              <div className="Navbar__sideMenu--linkContainer">
                <NavLink
                  to="/watch"
                  className="navbar__Link"
                  activeClassName="Navbar__activeLink"
                  onClick={sideNavLinkClickHandler}
                >
                  Watch
                </NavLink>
              </div>

              <div className="hr-div"></div>
              <div className="Navbar__sideMenu--linkContainer">
                <NavLink
                  to="/wishlist"
                  onClick={() =>
                    dispatch({ type: "PRODUCTS_TO_SHOW", payload: "Wishlist" })
                  }
                  className="navbar__Link"
                  activeClassName="Navbar__activeLink"
                  onClick={sideNavLinkClickHandler}
                >
                  Wishlist
                </NavLink>
              </div>
            </div>
          </nav>
        </div>
      )}
      <div className="navbar" ref={navbarRef}>
        <ul className="navbar__ul">
          {width < 770 && (
            <li>
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
            </li>
          )}
          <li>
            <NavLink to="/" className="Navbar__logo">
              <div>RStore</div>
            </NavLink>
          </li>

          {width > 770 ? (
            <>
              <li>
                <NavLink
                  to="/products"
                  className="navbar__Link"
                  onClick={() =>
                    dispatch({
                      type: "PRODUCTS_TO_SHOW",
                      payload: "AllProducts",
                    })
                  }
                  activeClassName="Navbar__activeLink"
                >
                  All Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/mobile"
                  className="navbar__Link"
                  activeClassName="Navbar__activeLink"
                >
                  Mobile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tv"
                  className="navbar__Link"
                  activeClassName="Navbar__activeLink"
                >
                  TV
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/laptop"
                  className="navbar__Link"
                  activeClassName="Navbar__activeLink"
                >
                  Laptop
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/watch"
                  className="navbar__Link"
                  activeClassName="Navbar__activeLink"
                >
                  Watch
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/wishlist"
                  onClick={() =>
                    dispatch({ type: "PRODUCTS_TO_SHOW", payload: "Wishlist" })
                  }
                  className="navbar__Link"
                  activeClassName="Navbar__activeLink"
                >
                  Wishlist
                </NavLink>
              </li>
              <li>
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
                      />
                      <AiOutlineSearch className="navbar__searchIcon" />
                    </div>
                  )}
                </div>
              </li>
            </>
          ) : null}

          <li>
            <NavLink
              to="/cart"
              onClick={() =>
                dispatch({ type: "PRODUCTS_TO_SHOW", payload: "Cart" })
              }
              className="navbar__Link"
              activeClassName="Navbar__activeLink"
            >
              <BsBag />
              <span className="navbar__productCount">{cartCount}</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
