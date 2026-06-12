import { useState } from "react";
import { useProduct } from "../../helpers";
import { Checkbox } from "../index";
import "./FilterDropDown.css";

function FilterDropDown() {
  const { filterPrice, toggleFastDelivery, toggleFreeShipping, setFilterPrice } =
    useProduct();
  const [priceFilterInput, setPriceFilterInput] = useState(150000);

  const priceFilterInputHandler = (e) => {
    setPriceFilterInput(e.target.value);
    setFilterPrice(e.target.value);
  };

  return (
    <div className="FilterDropDown">
      <h5>Tags:</h5>
      <Checkbox name="Free Shipping" onToggle={toggleFreeShipping} />
      <Checkbox name="Fast Delivery" onToggle={toggleFastDelivery} />
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
