import { useState } from "react";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { Button } from "../index";
import "./CartProduct.css";

function CartProduct({ product: { _id: id, name, price, image }, quantity }) {
  const { changeQuantity, removeFromCart } = useCart();

  const decrease = () => {
    if (quantity <= 1) {
      removeFromCart(id);
    } else {
      changeQuantity(id, quantity - 1);
    }
  };

  const increase = () => {
    changeQuantity(id, quantity + 1);
  };

  return (
    <div className="cart-product">
      <Link to={`/product/${id}`} className="cart-product__image-link">
        <div className="cart-product__image-wrapper">
          <img className="cart-product__image" src={image} alt={name} />
        </div>
      </Link>

      <div className="cart-product__details">
        <Link to={`/product/${id}`} className="cart-product__name">
          {name}
        </Link>
        <p className="cart-product__unit-price">Rs. {price.toLocaleString()}</p>

        <div className="cart-product__actions">
          <div className="quantity-stepper">
            <button
              className="quantity-stepper__btn"
              onClick={decrease}
              aria-label="Decrease quantity"
            >
              <FiMinus size={14} />
            </button>
            <span className="quantity-stepper__value">{quantity}</span>
            <button
              className="quantity-stepper__btn"
              onClick={increase}
              aria-label="Increase quantity"
            >
              <FiPlus size={14} />
            </button>
          </div>

          <Button
            variant="ghost"
            icon={<FiTrash2 size={16} />}
            onClick={() => removeFromCart(id)}
            aria-label="Remove item"
          />
        </div>
      </div>

      <div className="cart-product__total">
        Rs. {(price * quantity).toLocaleString()}
      </div>
    </div>
  );
}

export default CartProduct;
