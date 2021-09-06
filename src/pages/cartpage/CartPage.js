import React, { useContext, useState } from "react";
import { CartProduct, CouponModal, Loader } from "../../components";
import { authContext } from "../../contexts/authContext";
import { useProduct } from "../../helpers";
import "./CartPage.css";
import axios from "axios";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

function CartPage() {
  const { dispatch, cart, isLoading } = useProduct();

  const { currentUser } = useContext(authContext);

  const [selectedCoupon, setSelectedCoupon] = useState(false);

  const couponCodes = [
    { name: "OFF30", discount: 0.3 },
    { name: "OFF50", discount: 0.5 },
    { name: "OFF70", discount: 0.7 },
  ];

  const displayRazorPay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("RazorPay SDK failed to load. Please try again after some time.");
      return;
    }

    const data = await axios.post("https://rstoreapi.herokuapp.com/checkout", {
      userId: currentUser._id,
    });
    console.log("RAZORPAY", data);
    const options = {
      key: process.env.RAZORPAY_KEY,
      amount: data.data.amount,
      currency: data.data.currency,
      name: "RStore",
      description: "RStore Checkout",
      image:
        "https://res.cloudinary.com/dxnixxwnf/image/upload/v1630847953/RLogo_fjtk3d.png",
      order_id: data.data.id,
      handler: function (response) {
        alert(
          `Payment successful for payment id - ,${response.razorpay_payment_id}`
        );
      },
      prefill: {
        name: currentUser.name,
        email: currentUser.email,
      },
      theme: {
        color: "#06c",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      alert(
        `Razorpay payment failed please try again later - ${response.error.description}`
      );
    });
  };

  // MODAL
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    console.log("modal opened");
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleCouponClick = (index) => {
    setSelectedCoupon(couponCodes[index]);
    setIsOpen(false);
  };

  const getTotalPriceReducer = (acc, product) => {
    return acc + product.product.price * product.quantity;
  };

  const getTotalPrice = () => {
    const totalPrice = cart.reduce(getTotalPriceReducer, 0);

    return totalPrice;
  };

  const totalPrice = getTotalPrice();

  let newTotal = selectedCoupon
    ? totalPrice - Math.round(getTotalPrice() * selectedCoupon.discount)
    : false;
  return (
    <div className="CartPage">
      {isLoading && <Loader />}
      {cart.map((product, index) => (
        <CartProduct
          key={product._id}
          product={product.product}
          cartId={product._id}
          quantity={product.quantity}
          dispatch={dispatch}
          getTotalPrice={getTotalPrice}
          key={product.id}
        />
      ))}

      {cart.length !== 0 && <div className="hr-div"></div>}
      {cart.length !== 0 && (
        <div className="CartPage__totalApplyOfferWrapper">
          <div className="CartPage__totalCartPriceContainer">
            Total: Rs.
            {newTotal ? (
              <div style={{ display: "flex" }}>
                <div className="CartPage__totalCartPrice--original">
                  {totalPrice.toLocaleString()}
                </div>
                <div className="CartPage__totalCartPrice--discounted">
                  {newTotal.toLocaleString()}
                </div>
              </div>
            ) : (
              <div>{totalPrice.toLocaleString()}</div>
            )}
          </div>
          <button onClick={displayRazorPay}>CheckOut</button>
        </div>
      )}
      {cart.length === 0 && (
        <div className="CartPage__totalCartPrice">Cart Is Empty</div>
      )}
    </div>
  );
}

export default CartPage;
