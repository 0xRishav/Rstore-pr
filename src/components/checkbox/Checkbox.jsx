import React from "react";
import { useProduct } from "../../helpers";
import "./Checkbox.css";

function Checkbox({ name, onToggle }) {
  const { showFreeShippingOnly, showFastDeliveryOnly } = useProduct();
  return (
    <label className="checkbox">
      <span className="checkbox__input">
        <input
          type="checkbox"
          name="checkbox"
          onChange={onToggle}
          checked={
            name === "Free Shipping"
              ? showFreeShippingOnly === true
              : showFastDeliveryOnly === true
          }
        />
        <span className="checkbox__control">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable={false}
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              d="M1.73 12.91l6.37 6.37L22.79 4.59"
            />
          </svg>
        </span>
      </span>
      <span className="checkbox__label">{name}</span>
    </label>
  );
}

export default Checkbox;
