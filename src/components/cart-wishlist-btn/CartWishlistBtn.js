import React, { useState, useEffect } from "react";
import { useProduct } from "../../helpers";
import "./CartWishlistBtn.css";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

function CartWishlistBtn({ id, isProductsPage }) {
  const {
    addToCart,
    removeFromCart,
    removeFromWishlist,
    wishlist,
    addToWishlist,
    cart,
  } = useProduct();

  const history = useHistory();
  const { isUserLoggedIn } = useAuth();
  const [isInCart, setIsInCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

 
  useEffect(()=>{
  const IsInCart = cart?.some((cartProduct) => cartProduct?.product._id === id);
  setIsInCart(IsInCart);
  }, [cart]);

  useEffect(()=>{
    const IsInWishlist = wishlist?.some(
      (wishlistProduct) => wishlistProduct?._id === id
    );
    setIsInWishlist(IsInWishlist);
  }, [wishlist])


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
