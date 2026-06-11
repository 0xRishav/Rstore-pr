import React, { useContext } from "react";
import { useProduct } from "../../helpers";
import "./SortRadioBtns.css";

function SortRadioBtns() {
  const { sortBy, dispatch } = useProduct();

  const handleSortBtnOnChange = (payload) => {
    dispatch({ type: "SORT_BY", payload: payload });
  };

  return (
    <div className="radio-btn-wrapper">
      <h5>Price: </h5>

      <label className="radio-btn-container" for="low-to-high">
        <input
          type="radio"
          id="low-to-high"
          value="sort"
          name="sort"
          onChange={() => handleSortBtnOnChange("LOW_TO_HIGH")}
          checked={sortBy && sortBy === "LOW_TO_HIGH"}
          className="radio-btn"
        />
        <span class="checkmark"></span>
        Low To High
      </label>

      <label for="high-to-low" className="radio-btn-container">
        <input
          type="radio"
          id="high-to-low"
          value="sort"
          name="sort"
          onChange={() => handleSortBtnOnChange("HIGH_TO_LOW")}
          checked={sortBy && sortBy === "HIGH_TO_LOW"}
          className="radio-btn"
        />
        <span class="checkmark"></span>
        High To Low
      </label>
    </div>
  );
}

export default SortRadioBtns;
