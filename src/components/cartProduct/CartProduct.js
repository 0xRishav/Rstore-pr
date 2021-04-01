import React from "react";
import "./CartProduct.css";

function CartProduct({
  id,
  name,
  image,
  price,
  description,
  isInCart,
  isInWishlist,
  dispatch,
  quantity,
  getTotalPrice,
}) {
  const TotalPrice = getTotalPrice();

  return (
    <div className="CartProduct">
      <div className="hr-div"></div>
      <div className="CartProduct__wrapper">
        <img className="CartProduct__image" src={image} alt={`${name}image`} />
        <div className="CartProduct__name">{name}</div>
        <div className="CartProduct__quantityWrapper">
          <button
            className="Product__button--secondary"
            onClick={() => dispatch({ type: "INCREASE_QUANTITY", payload: id })}
          >
            +
          </button>
          {quantity}
          <button
            className="Product__button--secondary"
            onClick={() => dispatch({ type: "DECREASE_QUANTITY", payload: id })}
          >
            -
          </button>
        </div>
        <div className="CartProduct__subTotal">Rs. {price * quantity}</div>
        <div
          className="CartProduct__removeProuctLink"
          onClick={() => dispatch({ type: "TOGGLE_ITEM_IN_CART", payload: id })}
        >
          Remove
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
