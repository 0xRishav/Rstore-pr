import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { SkeletonProductDetail, Stars, CartWishlistBtn, Badge } from "../../components";
import api from "../../api/client";
import "./ProductPage.css";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [aboutOpen, setAboutOpen] = useState(true);

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

  if (isLoading) return <SkeletonProductDetail />;
  if (error || !product) {
    return (
      <div className="product-page__error">
        <h1>Product not found</h1>
        <Link to="/products" className="btn btn--primary">
          Browse Products
        </Link>
      </div>
    );
  }

  const { name, images, price, fastDelivery, freeShipping, about, rating, category } = product;

  return (
    <div className="product-page">
      <nav className="product-page__breadcrumb">
        <Link to="/">Home</Link>
        <FiChevronRight size={14} />
        {category && <Link to={`/category/${category}`}>{category}</Link>}
        {category && <FiChevronRight size={14} />}
        <span>{name}</span>
      </nav>

      <div className="product-page__layout">
        {/* Left: Image Gallery */}
        <div className="product-page__gallery">
          <div className="product-page__main-image-wrapper">
            <img
              className="product-page__main-image"
              src={images?.[selectedImage]}
              alt={name}
            />
          </div>
          {images?.length > 1 && (
            <div className="product-page__thumbnails">
              {images.map((img, i) => (
                <button
                  key={i}
                  className={`product-page__thumbnail ${
                    i === selectedImage ? "product-page__thumbnail--active" : ""
                  }`}
                  onClick={() => setSelectedImage(i)}
                >
                  <img src={img} alt={`${name} ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div className="product-page__info">
          <h1 className="product-page__name">{name}</h1>

          <div className="product-page__rating">
            <Stars rating={rating} />
          </div>

          <p className="product-page__price">Rs. {price?.toLocaleString()}</p>

          <div className="product-page__badges">
            {fastDelivery && <Badge variant="warning">Fast Delivery</Badge>}
            {freeShipping && <Badge variant="success">Free Shipping</Badge>}
          </div>

          <div className="product-page__actions">
            <CartWishlistBtn id={id} />
          </div>

          {/* About Section */}
          {about?.length > 0 && (
            <div className="product-page__about">
              <button
                className="product-page__about-toggle"
                onClick={() => setAboutOpen(!aboutOpen)}
              >
                <span>About this product</span>
                <FiChevronDown
                  size={18}
                  className={`product-page__about-arrow ${
                    aboutOpen ? "product-page__about-arrow--open" : ""
                  }`}
                />
              </button>
              {aboutOpen && (
                <ul className="product-page__about-list">
                  {about.map((item, i) => (
                    <li key={i} className="product-page__about-item">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
