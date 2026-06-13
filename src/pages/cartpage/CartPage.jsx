import { useContext, useState } from "react";
import { FiShoppingCart, FiTrash2, FiShield, FiMinus, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { EmptyState, Button, Badge } from "../../components";
import { useAuth } from "../../contexts/authContext";
import { useCart } from "../../contexts/CartContext";
import Skeleton from "../../components/skeleton/Skeleton";
import "./CartPage.css";
import api from "../../api/client";

function CartProduct({ product: { _id: id, name, price, image }, quantity }) {
  const { changeQuantity, removeFromCart } = useCart();

  const decrease = () => {
    if (quantity <= 1) {
      removeFromCart(id);
    } else {
      changeQuantity(id, quantity - 1);
    }
  };

  const increase = () => {
    changeQuantity(id, quantity + 1);
  };

  return (
    <div className="cart-product">
      <Link to={`/product/${id}`} className="cart-product__image-link">
        <div className="cart-product__image-wrapper">
          <img className="cart-product__image" src={image} alt={name} />
        </div>
      </Link>

      <div className="cart-product__details">
        <Link to={`/product/${id}`} className="cart-product__name">
          {name}
        </Link>
        <p className="cart-product__unit-price">Rs. {price.toLocaleString()}</p>

        <div className="cart-product__actions">
          <div className="quantity-stepper">
            <button
              className="quantity-stepper__btn"
              onClick={decrease}
              aria-label="Decrease quantity"
            >
              <FiMinus size={14} />
            </button>
            <span className="quantity-stepper__value">{quantity}</span>
            <button
              className="quantity-stepper__btn"
              onClick={increase}
              aria-label="Increase quantity"
            >
              <FiPlus size={14} />
            </button>
          </div>

          <Button
            variant="ghost"
            icon={<FiTrash2 size={16} />}
            onClick={() => removeFromCart(id)}
            aria-label="Remove item"
          />
        </div>
      </div>

      <div className="cart-product__total">
        Rs. {(price * quantity).toLocaleString()}
      </div>
    </div>
  );
}

function CartItemSkeleton() {
  return (
    <div
      style={{
        display: "flex",
        gap: "var(--space-4)",
        padding: "var(--space-4)",
        background: "var(--surface-primary)",
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-card)",
      }}
      aria-hidden="true"
    >
      <Skeleton width="100px" height="100px" borderRadius="12px" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "var(--space-2)", justifyContent: "center" }}>
        <Skeleton width="70%" height="16px" borderRadius="4px" />
        <Skeleton width="40%" height="14px" borderRadius="4px" />
        <Skeleton width="120px" height="32px" borderRadius="8px" />
      </div>
      <Skeleton width="80px" height="20px" borderRadius="4px" />
    </div>
  );
}

function SkeletonCartPage() {
  return (
    <div className="cart-page" aria-hidden="true">
      <div className="cart-page__header">
        <Skeleton width="220px" height="28px" borderRadius="6px" />
        <Skeleton width="80px" height="16px" borderRadius="4px" />
      </div>
      <div className="cart-page__layout">
        <div className="cart-page__items">
          <CartItemSkeleton />
          <CartItemSkeleton />
          <CartItemSkeleton />
        </div>
        <div className="cart-page__summary">
          <div
            className="cart-page__summary-card"
            style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}
          >
            <Skeleton width="140px" height="20px" borderRadius="4px" />
            <Skeleton width="100%" height="14px" borderRadius="4px" />
            <Skeleton width="100%" height="14px" borderRadius="4px" />
            <Skeleton width="100%" height="1px" borderRadius="0" />
            <Skeleton width="100%" height="18px" borderRadius="4px" />
            <Skeleton width="100%" height="48px" borderRadius="12px" />
          </div>
        </div>
      </div>
    </div>
  );
}

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function CartPage() {
  const { cart, isLoading, clearCart } = useCart();
  const { currentUser } = useAuth();

  const displayRazorPay = async () => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("RazorPay SDK failed to load. Please try again after some time.");
      return;
    }

    const response = await api.post("/api/checkout");
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: response.data.data.amount,
      currency: response.data.data.currency,
      name: "RStore",
      description: "RStore Checkout",
      image: "https://res.cloudinary.com/dxnixxwnf/image/upload/v1630847953/RLogo_fjtk3d.png",
      order_id: response.data.data.id,
      handler: function (response) {
        alert(`Payment successful for payment id - ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: currentUser?.name,
        email: currentUser?.email,
      },
      theme: {
        color: "#0066ff",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      alert(`Razorpay payment failed - ${response.error.description}`);
    });
  };

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal >= 999 ? 0 : 99;

  if (isLoading) return <SkeletonCartPage />;

  if (cart.length === 0) {
    return (
      <EmptyState
        message="Your cart is empty"
        linkTo="/products"
        linkText="Start Shopping"
        icon={<FiShoppingCart size={48} />}
      />
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-page__header">
        <h1 className="cart-page__title">Shopping Cart</h1>
        <span className="cart-page__count">{cart.length} item{cart.length !== 1 ? "s" : ""}</span>
        <Button variant="ghost" icon={<FiTrash2 size={14} />} onClick={clearCart}>
          Clear all
        </Button>
      </div>

      <div className="cart-page__layout">
        <div className="cart-page__items">
          {cart.map((item) => (
            <CartProduct
              key={item._id}
              product={item.product}
              quantity={item.quantity}
            />
          ))}
        </div>

        <div className="cart-page__summary">
          <div className="cart-page__summary-card">
            <h3 className="cart-page__summary-title">Order Summary</h3>

            <div className="cart-page__summary-row">
              <span>Subtotal</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>

            <div className="cart-page__summary-row">
              <span>Shipping</span>
              {shipping === 0 ? (
                <Badge variant="success">FREE</Badge>
              ) : (
                <span>Rs. {shipping}</span>
              )}
            </div>

            <div className="cart-page__summary-divider" />

            <div className="cart-page__summary-row cart-page__summary-row--total">
              <span>Total</span>
              <span>Rs. {(subtotal + shipping).toLocaleString()}</span>
            </div>

            <Button
              variant="primary"
              fullWidth
              size="lg"
              onClick={displayRazorPay}
            >
              Proceed to Checkout
            </Button>

            <div className="cart-page__secure">
              <FiShield size={14} />
              <span>Secure checkout via Razorpay</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
