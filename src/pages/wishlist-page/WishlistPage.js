import React, { useContext } from "react";
import { Product } from "../../components";
import { ProductsContext } from "../../contexts/productsContext";
import "./WishlistPage.css";

function WishlistPage() {
  const { products, dispatch } = useContext(ProductsContext).products;
  const wishlistProducts = products.filter((product) => product.isInWishlist);

  return (
    <div className="WishlistPage">
      <div className="products-wrapper">
        {wishlistProducts.map((product) => (
          <Product {...product} dispatch={dispatch} key={product.id} />
        ))}
      </div>
      {wishlistProducts.length === 0 && (
        <div className="WishlistPage__emptyWishlist">wishlist is empty</div>
      )}
    </div>
  );
}

export default WishlistPage;
