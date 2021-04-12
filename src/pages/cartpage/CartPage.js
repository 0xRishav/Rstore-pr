import React, { useContext, useState } from "react";
import { CartProduct, CouponModal } from "../../components";
import { ProductsContext } from "../../contexts/productsContext";
import { useProduct } from "../../helpers";
import "./CartPage.css";

function CartPage() {
  const { products, dispatch } = useProduct();
  const cartProducts = products.filter((product) => product.isInCart);

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

  const getTotalPriceReducer = (acc, { price, quantity }) => {
    return acc + price * quantity;
  };

  const getTotalPrice = () => {
    const totalPrice = products
      .filter((product) => product.isInCart)
      .reduce(getTotalPriceReducer, 0);

    return totalPrice;
  };

  const totalPrice = getTotalPrice();

  let newTotal = selectedCoupon
    ? totalPrice - Math.round(getTotalPrice() * selectedCoupon.discount)
    : false;
  return (
    <div className="CartPage">
      {cartProducts.map((product) => (
        <CartProduct
          {...product}
          dispatch={dispatch}
          getTotalPrice={getTotalPrice}
          key={product.id}
        />
      ))}

      {cartProducts.length !== 0 && <div className="hr-div"></div>}
      {cartProducts.length !== 0 && (
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
      {cartProducts.length === 0 && (
        <div className="CartPage__totalCartPrice">Cart Is Empty</div>
      )}
    </div>
  );
}

export default CartPage;
