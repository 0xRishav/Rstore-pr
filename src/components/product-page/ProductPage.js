import { useContext } from "react";
import { useParams } from "react-router";
import { CartWishlistBtn, Navbar } from "..";
import { ProductsContext } from "../../contexts/productsContext";
import "./ProductPage.css";

function ProductPage() {
  const { id } = useParams();
  const { products, dispatch } = useContext(ProductsContext).products;

  const {
    name,
    image,
    price,
    description,
    isInCart,
    isInWishlist,
    fastDelivery,
    freeShipping,
  } = products.find((product) => product.id === id);

  return (
    <div className="productPage">
      <Navbar />
      <div className="productPage__wrapper">
        <img className="productPage__image" src={image} alt={`${name}-Image`} />
        <div className="ProductPage__rightContainer">
          <div className="productPage__name">{name}</div>
          <div className="productPage__description">{description}</div>
          <div className="productPage__offerWrapper">
            {fastDelivery && (
              <div className="productPage__offer">Fast Delivery</div>
            )}
            {freeShipping && (
              <div className="productPage__offer">Free Shipping</div>
            )}
          </div>
          <div className="ProductPage__buttonWrapper">
            <CartWishlistBtn
              id={id}
              isInCart={isInCart}
              isInWishlist={isInWishlist}
              dispatch={dispatch}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
