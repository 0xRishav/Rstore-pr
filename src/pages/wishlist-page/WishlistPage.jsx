import React from "react";
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
          wishlist is empty
        </div>
      )}
    </div>
  );
}

export default WishlistPage;
