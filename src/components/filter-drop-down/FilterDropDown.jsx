import { useProduct } from "../../helpers";
import { Checkbox } from "../index";
import "./FilterDropDown.css";

function FilterDropDown() {
  const { filterPrice, toggleFastDelivery, toggleFreeShipping, setFilterPrice } =
    useProduct();

  const handlePriceChange = (e) => {
    setFilterPrice(e.target.value);
  };

  return (
    <div className="filter-dropdown">
      <div className="filter-dropdown__section">
        <h4 className="filter-dropdown__heading">Tags</h4>
        <Checkbox name="Free Shipping" onToggle={toggleFreeShipping} />
        <Checkbox name="Fast Delivery" onToggle={toggleFastDelivery} />
      </div>

      <div className="filter-dropdown__section">
        <h4 className="filter-dropdown__heading">
          Max Price: <span className="filter-dropdown__price">Rs. {Number(filterPrice).toLocaleString()}</span>
        </h4>
        <input
          type="range"
          className="filter-dropdown__range"
          min="0"
          max="150000"
          step="1000"
          value={filterPrice}
          onChange={handlePriceChange}
        />
        <div className="filter-dropdown__range-labels">
          <span>Rs. 0</span>
          <span>Rs. 1,50,000</span>
        </div>
      </div>
    </div>
  );
}

export default FilterDropDown;
