import React from "react";
import { useProduct } from "../../helpers";
import "./CartWishlistBtn.css";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

function CartWishlistBtn({ id, dispatch, isProductsPage }) {
  const {
    addToCart,
    removeFromCart,
    addToWishList,
    removeFromWishlist,
    wishlist,
    addToWishlist,
    cart,
  } = useProduct();
  
  const history = useHistory();
  const isInCart = cart.some((cartProduct) => cartProduct.product._id == id);
  const isInWishlist = wishlist.some(
    (wishlistProduct) => wishlistProduct._id == id
  );

  const { isUserLoggedIn } = useAuth();

  if(isInCart){
    console.log("from btn", id);
  }

  return (
    <div
      className={
        isProductsPage ? "allProductsBtns CartWishlistBtn" : "CartWishlistBtn"
      }
    >
      <button
        onClick={
          isUserLoggedIn
            ? isInCart
              ? () => removeFromCart(id)
              : () => {
                  addToCart(id);
                }
            : () => history.push("/signin")
        }
        className={
          isProductsPage
            ? "blue-btn--primary allProductsBtn"
            : "blue-btn--primary"
        }
      >
        {isInCart ? "Remove From Cart" : "Add To Cart"}
      </button>
      <button
        onClick={
          isUserLoggedIn
            ? isInWishlist
              ? () => {
                  removeFromWishlist(id);
                }
              : () => {
                  addToWishlist(id);
                }
            : () => history.push("/signin")
        }
        className={
          isProductsPage
            ? "blue-btn--secondary allProductsBtn"
            : "blue-btn--secondary"
        }
      >
        {isInWishlist ? "Remove From Wishlist" : "Add To Wishlist"}
      </button>
    </div>
  );
}

export default CartWishlistBtn;
