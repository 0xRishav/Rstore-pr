import { useState, useEffect } from "react";
import { AiFillTag } from "react-icons/ai";
import { BsHeart, BsHeartFill, BsCart3, BsCartCheck } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { Badge, Button } from "..";
import { useCart } from "../../contexts/CartContext";
import { useWishlist } from "../../contexts/WishlistContext";
import { useAuth } from "../../contexts/authContext";
import "./Product.css";

function Product(props) {
  const { id, name, images, price, fastDelivery, freeShipping } = props;
  const [imageToBeShown, setImageToBeShown] = useState(images?.[0]);
  const { addToCart, removeFromCart, cart } = useCart();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const navigate = useNavigate();
  const { isUserLoggedIn } = useAuth();

  const [isInCart, setIsInCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

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

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  const handleMouseEnter = () => {
    if (images?.[1]) setImageToBeShown(images[1]);
  };

  const handleMouseLeave = () => {
    if (images?.[0]) setImageToBeShown(images[0]);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${id}`} className="product-card__image-link">
        <div className="product-card__image-wrapper">
          <img
            className="product-card__image"
            src={imageToBeShown}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            alt={name}
            loading="lazy"
          />
        </div>
      </Link>

      <div className="product-card__body">
        <Link to={`/product/${id}`} className="product-card__name-link">
          <h3 className="product-card__name">{truncate(name, 40)}</h3>
        </Link>

        <p className="product-card__price">Rs. {price?.toLocaleString()}</p>

        <div className="product-card__badges">
          {fastDelivery && (
            <Badge variant="warning" icon={<AiFillTag />}>
              Fast Delivery
            </Badge>
          )}
          {freeShipping && (
            <Badge variant="success" icon={<AiFillTag />}>
              Free Shipping
            </Badge>
          )}
        </div>

        <div className="product-card__actions">
          <Button
            variant="primary"
            size="sm"
            fullWidth
            icon={isInCart ? <BsCartCheck size={16} /> : <BsCart3 size={16} />}
            onClick={handleCartClick}
          >
            {isInCart ? "In Cart" : "Add to Cart"}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={isInWishlist ? <BsHeartFill size={16} color="#ef4444" /> : <BsHeart size={16} />}
            onClick={handleWishlistClick}
            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          />
        </div>
      </div>
    </div>
  );
}

export default Product;
