import { Checkbox, SortRadioBtns } from "../index";
import "./FilterDropDown.css";

function FilterDropDown() {
  return (
    <div className="FilterDropDown">
      <h5>Tags:</h5>
      <Checkbox name="Free Shipping" />
      <Checkbox name="Fast Delivery" />
      <h5>Price:</h5>
      <input type="range" />
    </div>
  );
}

export default FilterDropDown;
