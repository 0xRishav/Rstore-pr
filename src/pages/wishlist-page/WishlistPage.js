import React, { useContext } from "react";
import { Product, Loader } from "../../components";
import { ProductsContext } from "../../contexts/productsContext";
import { useProduct } from "../../helpers";
import "./WishlistPage.css";

function WishlistPage() {
  const { products, dispatch, isLoading, wishlist } = useProduct();
  const wishlistProducts = products.filter((product) => product.isInWishlist);

  return (
    <div className="WishlistPage">
      {isLoading && <Loader />}
      <div className="products-wrapper">
        {wishlist.map((product, index) => (
          <Product
            key={index}
            {...product}
            dispatch={dispatch}
            key={product._id}
            id={product._id}
          />
        ))}
      </div>
      {wishlist.length === 0 && (
        <div className="WishlistPage__emptyWishlist">wishlist is empty</div>
      )}
    </div>
  );
}

export default WishlistPage;
