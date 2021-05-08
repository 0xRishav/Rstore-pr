import React, { useContext, useState } from "react";
import { CartProduct, CouponModal, Loader } from "../../components";
import { ProductsContext } from "../../contexts/productsContext";
import { useProduct } from "../../helpers";
import "./CartPage.css";

function CartPage() {
  const {
    products,
    dispatch,
    cart,
    addToCart,
    removeFromCart,
    isLoading,
  } = useProduct();
  const cartProducts = products.filter((product) => product.isInCart);

  console.log({ cart });

  const [selectedCoupon, setSelectedCoupon] = useState(false);

  const couponCodes = [
    { name: "OFF30", discount: 0.3 },
    { name: "OFF50", discount: 0.5 },
    { name: "OFF70", discount: 0.7 },
  ];

  // MODAL
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
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

  cart.map((cartProduct) => console.log("PRODUCT", cartProduct.quantity));

  let newTotal = selectedCoupon
    ? totalPrice - Math.round(getTotalPrice() * selectedCoupon.discount)
    : false;
  return (
    <div className="CartPage">
      {isLoading && <Loader />}
      {cart.map((product) => (
        <CartProduct
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
          <CouponModal
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
            afterOpenModal={afterOpenModal}
            openModal={openModal}
            couponCodes={couponCodes}
            handleCouponClick={handleCouponClick}
            selectedCoupon={selectedCoupon}
          />
        </div>
      )}
      {cart.length === 0 && (
        <div className="CartPage__totalCartPrice">Cart Is Empty</div>
      )}
    </div>
  );
}

export default CartPage;
