import React, { useContext, useEffect, useState, useRef } from "react";
import "./Navbar.css";
import { BsBag } from "react-icons/bs";
import { ProductsContext } from "../../contexts/productsContext";
import { Link } from "react-router-dom";
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
            <Link to="/" className="Navbar__logo">
              <div>RStore</div>
            </Link>
          </li>

          <li>
            <Link
              to="/products"
              className="navbar__Link"
              onClick={() =>
                dispatch({
                  type: "PRODUCTS_TO_SHOW",
                  payload: "AllProducts",
                })
              }
            >
              All Products
            </Link>
          </li>

          <li>
            <Link to="/mobile" className="navbar__Link">
              Mobile
            </Link>
          </li>
          <li>
            <Link to="/tv" className="navbar__Link">
              TV
            </Link>
          </li>
          <li>
            <Link to="/laptop" className="navbar__Link">
              Laptop
            </Link>
          </li>
          <li>
            <Link to="/watch" className="navbar__Link">
              Watch
            </Link>
          </li>

          <li>
            <Link
              to="/wishlist"
              onClick={() =>
                dispatch({ type: "PRODUCTS_TO_SHOW", payload: "Wishlist" })
              }
              className="navbar__Link"
            >
              Wishlist
            </Link>
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
            <Link
              to="/cart"
              onClick={() =>
                dispatch({ type: "PRODUCTS_TO_SHOW", payload: "Cart" })
              }
              className="navbar__Link"
            >
              <BsBag />
              <span className="navbar__productCount">{cartCount}</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
