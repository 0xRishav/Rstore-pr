import React, { useContext, useEffect, useState, useRef } from "react";
import "./Navbar.css";
import { BsBag } from "react-icons/bs";
import { ProductsContext } from "../../contexts/productsContext";
import { NavLink } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

function Navbar() {
  const { products, dispatch } = useContext(ProductsContext).products;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
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

  cartCount = getCartCount();

  console.log({ cartCount });
  return (
    <div
      className={
        isScrolled === false
          ? "navbar__wrapper"
          : "navbar__wrapper navbar__wrapper--scrolled"
      }
    >
      <div className="navbar" ref={navbarRef}>
        <ul className="navbar__ul">
          <li>
            <NavLink to="/" className="Navbar__logo">
              <div>RStore</div>
            </NavLink>
          </li>

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
                  />
                  <AiOutlineSearch className="navbar__searchIcon" />
                </div>
              )}
            </div>
          </li>

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
