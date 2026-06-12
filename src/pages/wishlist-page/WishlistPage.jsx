import React from "react";
import { Link } from "react-router-dom";
import { Product, Loader } from "../../components";
import { useWishlist } from "../../contexts/WishlistContext";
import "./WishlistPage.css";

function WishlistPage() {
  const { isLoading, wishlist } = useWishlist();

  return (
    <div className="WishlistPage">
      {isLoading && <Loader />}
      <div className="products-wrapper">
        {wishlist.map((product, index) => (
          <Product
            key={product._id}
            {...product}
            id={product._id}
          />
        ))}
      </div>
      {wishlist.length === 0 && (
        <div className="WishlistPage__emptyWishlist">
          <p>Your wishlist is empty</p>
          <Link className="blue-btn--secondary" to="/products">
            Browse Products
          </Link>
        </div>
      )}
    </div>
  );
}

export default WishlistPage;
