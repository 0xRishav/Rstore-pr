import React from "react";
import { Link } from "react-router-dom";
import "./BuyNowTextLinks.css";

function BuyNowTextLinks({ link }) {
  return (
    <div className="BuyNowTextLinks__linkBtnWrapper">
      <Link to={link} className="BuyNowTextLinks__link">
        Buy Now {`>`}
      </Link>
      <Link to="/products" className="BuyNowTextLinks__link">
        See All Products
      </Link>
    </div>
  );
}

export default BuyNowTextLinks;
