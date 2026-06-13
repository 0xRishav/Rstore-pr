import { useContext, useState } from "react";
import { FiShoppingCart, FiTrash2, FiShield } from "react-icons/fi";
import { CartProduct, SkeletonCartPage, EmptyState, Button } from "../../components";
import { useAuth } from "../../contexts/authContext";
import { useCart } from "../../contexts/CartContext";
import "./CartPage.css";
import api from "../../api/client";

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
