import { useState, useEffect } from "react";
import { useCart } from "../../contexts/CartContext";
import { useWishlist } from "../../contexts/WishlistContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { BsHeart, BsHeartFill, BsCart3, BsCartCheck } from "react-icons/bs";
import { Button } from "../index";
import "./CartWishlistBtn.css";

function CartWishlistBtn({ id, isProductsPage }) {
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

  if (isProductsPage) {
    return (
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
    );
  }

  return (
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
  );
}

export default CartWishlistBtn;
