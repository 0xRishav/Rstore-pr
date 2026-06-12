import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartWishlistBtn, ImageSlider, Loader, Stars } from "..";
import "./ProductPage.css";
import api from "../../api/client";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      try {
        const res = await api.get(`/api/products/${id}`);
        if (res.data.success) {
          setProduct(res.data.data);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      }
      setIsLoading(false);
    })();
  }, [id]);

  if (isLoading) return <Loader />;
  if (error || !product) {
    return (
      <div className="productPage">
        <h1 className="productPage__notFound">
          Product not found
        </h1>
      </div>
    );
  }

  const { name, images, price, fastDelivery, freeShipping, about, rating } =
    product;

  return (
    <div className="productPage">
      <div className="productPage__wrapper">
        <ImageSlider images={images} parent={ProductPage} />
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
            <CartWishlistBtn id={id} />
          </div>
          <h4>About this Product</h4>
          <ul>
            {about?.map((item, index) => (
              <li className="ProductPage__aboutLi" key={index}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
