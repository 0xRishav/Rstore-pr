import React, { useState } from "react";
import "./CartProduct.css";
import { useProduct } from "../../helpers";
import { Loader } from "..";
import Select from "react-select";

// : { id, name, price, image }
function CartProduct({ product: { _id: id, name, price, image }, quantity }) {
  const { changeQuantity, isLoading, removeFromCart } = useProduct();
  const options = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
  ];

  const [selectValue, setSelectValue] = useState({
    value: quantity,
    label: quantity,
  });

  const dropDownChangeHandler = (e) => {
    setSelectValue(e);
    changeQuantity(id, e.value);
  };

  return (
    <div className="CartProduct">
      {isLoading && <Loader />}
      <div className="hr-div"></div>
      <div className="CartProduct__wrapper">
        <img className="CartProduct__image" src={image} alt={`${name}image`} />
        <div className="CartProduct__name">{name}</div>
        <div className="CartProduct__quantityWrapper">
          <Select
            options={options}
            onChange={dropDownChangeHandler}
            value={selectValue}
          />
        </div>

        <div className="CartProduct__subTotal">
          Rs. {(price * quantity).toLocaleString()}
        </div>
        <button
          className="CartProduct__removeProuctLink"
          onClick={() => removeFromCart(id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartProduct;
