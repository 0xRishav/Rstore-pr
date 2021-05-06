import React from "react";
import { useProduct } from "../../helpers";
import "./CartWishlistBtn.css";

function CartWishlistBtn({
  id,
  isInCart,
  isInWishlist,
  dispatch,
  isProductsPage,
}) {
  const {
    addToCart,
    removeFromCart,
    addToWishList,
    removeFromWishlist,
  } = useProduct();
  return (
    <div
      className={
        isProductsPage ? "allProductsBtns CartWishlistBtn" : "CartWishlistBtn"
      }
    >
      <button
        onClick={addToCart(id)}
        className={
          isProductsPage
            ? "blue-btn--primary allProductsBtn"
            : "blue-btn--primary"
        }
      >
        {isInCart ? "Remove From Cart" : "Add To Cart"}
      </button>
      <button
        onClick={() =>
          dispatch({ type: "TOGGLE_ITEM_IN_WISHLIST", payload: id })
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
