import { useContext, useState } from "react";
import { ProductsContext } from "../../contexts/productsContext";
import { useProduct } from "../../helpers";
import { Checkbox, SortRadioBtns } from "../index";
import "./FilterDropDown.css";

function FilterDropDown() {
  const { dispatch, filterPrice } = useProduct();
  const [priceFilterInput, setPriceFilterInput] = useState(150000);

  const priceFilterInputHandler = (e) => {
    setPriceFilterInput(e.target.value);
    dispatch({ type: "FILTER_BY_PRICE", payload: priceFilterInput });
  };


  return (
    <div className="FilterDropDown">
      <h5>Tags:</h5>
      <Checkbox name="Free Shipping" />
      <Checkbox name="Fast Delivery" />
      <h5>Price:</h5>
      <input
        type="range"
        min="0"
        max="150000"
        value={filterPrice}
        onChange={priceFilterInputHandler}
      />
    </div>
  );
}

export default FilterDropDown;
