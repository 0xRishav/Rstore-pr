import React, { useContext, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { FilterDropDown, SortDropdown } from "..";
import { ProductsContext } from "../../contexts/productsContext";
import "./SortFilterWrapper.css";

function SortFilterWrapper() {
  const {
    showFastDeliveryOnly,
    showFreeShippingOnly,
    filterPrice,
    sortBy,
  } = useContext(ProductsContext).products;
  const [showFilterDropDown, setShowFilterDropDown] = useState(false);
  const [showSortDropDown, setShowSortDropDown] = useState(false);

  const filterDropDownClickHandler = () => {
    if (showSortDropDown === true) {
      setShowSortDropDown(false);
  }
    setShowFilterDropDown(!showFilterDropDown);
  };
  const sortDropDownClickHandler = () => {
    if (showFilterDropDown === true) {
      setShowFilterDropDown(false);
    }
    setShowSortDropDown(!showSortDropDown);
  };

  return (
    <div className="SortFilterWrapper">
      <div className="SortFilterWrapper__filterDropDownContainer">
        <h4 className="SortFilterWrapper__filterHeading">Filter:</h4>
        <button
          className="SortFilterWrapper__filterDropDownBtn"
          onClick={filterDropDownClickHandler}
        >
          {showFastDeliveryOnly || showFreeShippingOnly ? "Tags" : "None"}
          {filterPrice ? " & Price" : ""}
          <AiFillCaretDown />
        </button>
        {showFilterDropDown && <FilterDropDown />}
      </div>

      <div className="SortFilterWrapper__sortDropDownContainer">
        <h4 className="SortFilterWrapper__sortHeading">Sort by Price:</h4>
        <button
          className="SortFilterWrapper__sortDropDownBtn"
          onClick={sortDropDownClickHandler}
        >
          {sortBy
            ? sortBy === "LOW_TO_HIGH"
              ? "Low To High"
              : "High To Low"
            : "None"}
          <AiFillCaretDown />
        </button>
        {showSortDropDown && <SortDropdown />}
      </div>
    </div>
  );
}

export default SortFilterWrapper;
