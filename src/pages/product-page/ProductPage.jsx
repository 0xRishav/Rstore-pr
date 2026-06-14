import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { BsHeart, BsHeartFill, BsCart3, BsCartCheck } from "react-icons/bs";
import { Badge, Button } from "../../components";
import { useCart } from "../../contexts/CartContext";
import { useWishlist } from "../../contexts/WishlistContext";
import { useAuth } from "../../contexts/authContext";
import Skeleton from "../../components/skeleton/Skeleton";
import api from "../../api/client";
import "./ProductPage.css";

function BreadcrumbSkeleton() {
  return (
    <div className="product-page__breadcrumb" aria-hidden="true">
      <Skeleton width="40px" height="14px" borderRadius="4px" />
      <span style={{ color: "var(--text-tertiary)", fontSize: "14px" }}>/</span>
      <Skeleton width="60px" height="14px" borderRadius="4px" />
      <span style={{ color: "var(--text-tertiary)", fontSize: "14px" }}>/</span>
      <Skeleton width="120px" height="14px" borderRadius="4px" />
    </div>
  );
}

function SkeletonProductDetail() {
  return (
    <div className="product-page" aria-hidden="true">
      <BreadcrumbSkeleton />

      <div className="product-page__layout">
        <div className="product-page__gallery">
          <Skeleton
            width="100%"
            height="auto"
            style={{ aspectRatio: "1", borderRadius: "var(--radius-2xl)" }}
          />
          <div className="product-page__thumbnails" style={{ marginTop: "var(--space-4)" }}>
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} width="72px" height="72px" borderRadius="12px" />
            ))}
          </div>
        </div>

        <div className="product-page__info" style={{ gap: "var(--space-4)" }}>
          <Skeleton width="90%" height="30px" borderRadius="6px" />
          <Skeleton width="120px" height="20px" borderRadius="4px" />
          <Skeleton width="160px" height="36px" borderRadius="6px" />
          <div className="product-page__badges">
            <Skeleton width="100px" height="24px" borderRadius="6px" />
            <Skeleton width="100px" height="24px" borderRadius="6px" />
          </div>
          <Skeleton width="100%" height="48px" borderRadius="12px" />
          <Skeleton width="100%" height="1px" borderRadius="0" />
          <Skeleton width="100%" height="20px" borderRadius="4px" />
          <Skeleton width="100%" height="14px" borderRadius="4px" />
          <Skeleton width="100%" height="14px" borderRadius="4px" />
          <Skeleton width="60%" height="14px" borderRadius="4px" />
        </div>
      </div>
    </div>
  );
}

function Stars({ rating, size = 16, color }) {
  return (
    <span className="Stars" aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className="Stars__star"
          style={{ color: star <= Math.round(rating) ? (color || "var(--accent)") : "#ddd", fontSize: size }}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </span>
  );
}

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [aboutOpen, setAboutOpen] = useState(true);
  const [isInCart, setIsInCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { addToCart, removeFromCart, cart } = useCart();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const navigate = useNavigate();
  const { isUserLoggedIn } = useAuth();

  useEffect(() => {
    setIsInCart(cart?.some((item) => item?.product?._id === id));
  }, [cart, id]);

  useEffect(() => {
    setIsInWishlist(wishlist?.some((item) => item?._id === id));
  }, [wishlist, id]);

  const handleCartClick = () => {
    if (!isUserLoggedIn) return navigate("/signin");
    if (isInCart) {
      removeFromCart(id);
    } else {
      addToCart(id);
    }
  };

  const handleWishlistClick = () => {
    if (!isUserLoggedIn) return navigate("/signin");
    if (isInWishlist) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
  };

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
        {category && <Link to={`/products?category=${category}`}>{category}</Link>}
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

          <div className="product-actions">
            <Button
              variant="primary"
              icon={isInCart ? <BsCartCheck size={18} /> : <BsCart3 size={18} />}
              onClick={handleCartClick}
            >
              {isInCart ? "Remove from Cart" : "Add to Cart"}
            </Button>
            <Button
              variant={isInWishlist ? "danger" : "secondary"}
              icon={isInWishlist ? <BsHeartFill size={18} /> : <BsHeart size={18} />}
              onClick={handleWishlistClick}
            >
              {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            </Button>
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
