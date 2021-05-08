import React, { useState } from "react";
import "./CartProduct.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useProduct } from "../../helpers";
import { Loader } from "..";

// : { id, name, price, image }
function CartProduct({
  product: { _id: id, name, price, image },
  dispatch,
  getTotalPrice,
  quantity,
  cartId,
}) {
  const TotalPrice = getTotalPrice();
  const { changeQuantity, isLoading, removeFromCart } = useProduct();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const options = [1, 2, 3, 4, 5];
  const dropDownChangeHandler = (e) => {
    changeQuantity(id, e.value);
  };

  console.log("Normal id", id);
  console.log("second id", cartId);
  return (
    <div className="CartProduct">
      {isLoading && <Loader />}
      <div className="hr-div"></div>
      <div className="CartProduct__wrapper">
        <img className="CartProduct__image" src={image} alt={`${name}image`} />
        <div className="CartProduct__name">{name}</div>
        <div className="CartProduct__quantityWrapper">
          <div>{quantity}</div>
          <Dropdown
            options={options}
            onChange={dropDownChangeHandler}
            value={setSelectedQuantity}
            placeholder="Select Quantity"
          />
        </div>

        <div className="CartProduct__subTotal">
          Rs. {(price * quantity).toLocaleString()}
        </div>
        <div
          className="CartProduct__removeProuctLink"
          onClick={() => removeFromCart(id)}
        >
          Remove
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
