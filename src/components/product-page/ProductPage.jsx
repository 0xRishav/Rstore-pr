import { useParams } from "react-router-dom";
import { CartWishlistBtn, ImageSlider, Loader } from "..";
import "./ProductPage.css";
import { useProduct } from "../../helpers";

function Stars({ rating, size = 16, color = "#06c" }) {
  return (
    <span className="stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            color: star <= Math.round(rating) ? color : "#ddd",
            fontSize: size,
            marginRight: "2px",
          }}
        >
          ★
        </span>
      ))}
    </span>
  );
}

function ProductPage() {
  const { id } = useParams();
  const { isLoading, products, dispatch } = useProduct();

  const {
    name,
    image,
    price,
    isInCart,
    isInWishlist,
    fastDelivery,
    freeShipping,
    about,
    rating,
  } = products.find((product) => product._id === id);

  return (
    <div className="productPage">
      {isLoading && <Loader />}
      <div className="productPage__wrapper">
        <ImageSlider images={image} parent={ProductPage} />
        <div className="ProductPage__rightContainer">
          <div className="productPage__name">{name}</div>
          <div className="productPage__price">Rs. {price.toLocaleString()}</div>
          <Stars rating={rating} />
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
            {about.map((about, index) => (
              <li className="ProductPage__aboutLi" key={index}>
                {about}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
