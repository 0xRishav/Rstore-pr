import React from "react";

function CartWishlistBtn({ id, isInCart, isInWishlist, dispatch }) {
  return (
    <>
      <button
        onClick={() => dispatch({ type: "TOGGLE_ITEM_IN_CART", payload: id })}
        className="blue-btn--primary"
      >
        {isInCart ? "Remove From Cart" : "Add To Cart"}
      </button>
      <button
        onClick={() =>
          dispatch({ type: "TOGGLE_ITEM_IN_WISHLIST", payload: id })
        }
        className="blue-btn--secondary"
      >
        {isInWishlist ? "Remove From Wishlist" : "Add To Wishlist"}
      </button>
    </>
  );
}

export default CartWishlistBtn;
