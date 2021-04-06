import { useContext } from "react";
import { useParams } from "react-router";
import { CartWishlistBtn, ImageSlider } from "..";
import { ProductsContext } from "../../contexts/productsContext";
import StarRatings from "react-star-ratings";
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
    about,
    rating,
  } = products.find((product) => product.id === id);


  return (
    <div className="productPage">
      <div className="productPage__wrapper">
        <ImageSlider images={image} parent={ProductPage} />
        <div className="ProductPage__rightContainer">
          <div className="productPage__name">{name}</div>
          <div className="productPage__price">Rs. {price.toLocaleString()}</div>
          <StarRatings
            rating={rating}
            starDimension="16px"
            starSpacing="2px"
            starRatedColor="#06c"
          />
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
          <ul>
            <h4>About this Product</h4>
            {about.map((about) => (
              <li className="ProductPage__aboutLi">{about}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
