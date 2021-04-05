import { useContext, useState } from "react";
import { ProductsContext } from "../../contexts/productsContext";
import { Checkbox, SortRadioBtns } from "../index";
import "./FilterDropDown.css";

function FilterDropDown() {
  const { dispatch } = useContext(ProductsContext).products;
  const [priceFilterInput, setPriceFilterInput] = useState(false);

  const priceFilterInputHandler = (e) => {
    setPriceFilterInput(e.target.value);
    dispatch({ type: "FILTER_BY_PRICE", payload: priceFilterInput });
  };

  console.log("PRICE", priceFilterInput);

  return (
    <div className="FilterDropDown">
      <h5>Tags:</h5>
      <Checkbox name="Free Shipping" />
      <Checkbox name="Fast Delivery" />
      <h5>Price:</h5>
      <input
        type="range"
        min="0"
        max="149998"
        value={priceFilterInput}
        onChange={priceFilterInputHandler}
      />
    </div>
  );
}

export default FilterDropDown;
