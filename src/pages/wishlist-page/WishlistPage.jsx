import React from "react";
import { Product, Loader, EmptyState } from "../../components";
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
        <EmptyState message="Your wishlist is empty" linkTo="/products" />
      )}
    </div>
  );
}

export default WishlistPage;
