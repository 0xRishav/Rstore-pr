import React, { useState } from "react";
import "./Product.css";
import { AiFillTag } from "react-icons/ai";
import { Link } from "react-router-dom";
import { CartWishlistBtn } from "..";

function Product({
  id,
  name,
  image,
  price,
  description,
  isInCart,
  isInWishlist,
  dispatch,
  quantity,
  fastDelivery,
  freeShipping,
}) {
  const [imageToBeShown, setImageToBeShown] = useState(image[0]);

  const imageMouseEnterHandler = () => {
    setImageToBeShown(image[1]);
  };

  const imageMouseLeaveHandler = () => {
    setImageToBeShown(image[0]);
  };

  return (
    <div className="Product">
      <Link to={`/product/${id}`}>
        <img
          className="Product__image"
          src={imageToBeShown}
          onMouseEnter={imageMouseEnterHandler}
          onMouseLeave={imageMouseLeaveHandler}
          alt="productImage"
        />
      </Link>
      <h3 className="Product__productName">{name}</h3>
      <p className="Product__price">Rs. {price}</p>
      <div className="Product__offerWrapper">
        {fastDelivery && (
          <span className="Product__offer">
            <AiFillTag />
            Fast Delivery
          </span>
        )}
        {freeShipping && (
          <span className="Product__offer">
            <AiFillTag /> Free Shipping
          </span>
        )}
      </div>
      <div className="Product__buttonWrapper">
        <CartWishlistBtn
          id={id}
          isInCart={isInCart}
          isInWishlist={isInWishlist}
          dispatch={dispatch}
        />
      </div>
    </div>
  );
}

export default Product;
