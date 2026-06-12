import { useState } from "react";
import { AiFillTag } from "react-icons/ai";
import { Link } from "react-router-dom";
import { CartWishlistBtn } from "..";
import "./Product.css";

function Product(props) {
  const { id, name, images, price, fastDelivery, freeShipping } = props;
  const [imageToBeShown, setImageToBeShown] = useState(images?.[0]);

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  const handleMouseEnter = () => {
    if (images?.[1]) setImageToBeShown(images[1]);
  };

  const handleMouseLeave = () => {
    if (images?.[0]) setImageToBeShown(images[0]);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${id}`} className="product-card__image-link">
        <div className="product-card__image-wrapper">
          <img
            className="product-card__image"
            src={imageToBeShown}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            alt={name}
            loading="lazy"
          />
        </div>
      </Link>

      <div className="product-card__body">
        <Link to={`/product/${id}`} className="product-card__name-link">
          <h3 className="product-card__name">{truncate(name, 40)}</h3>
        </Link>

        <p className="product-card__price">Rs. {price?.toLocaleString()}</p>

        <div className="product-card__badges">
          {fastDelivery && (
            <span className="badge badge--warning">
              <AiFillTag /> Fast Delivery
            </span>
          )}
          {freeShipping && (
            <span className="badge badge--success">
              <AiFillTag /> Free Shipping
            </span>
          )}
        </div>

        <CartWishlistBtn id={id} isProductsPage />
      </div>
    </div>
  );
}

export default Product;
