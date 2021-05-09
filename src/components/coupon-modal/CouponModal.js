import React from "react";
import Modal from "react-modal";
import "./CouponModal.css";

function CouponModal({
  modalIsOpen,
  closeModal,
  afterOpenModal,
  openModal,
  couponCodes,
  handleCouponClick,
  selectedCoupon,
}) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div>
      <div className="App__ApplyCode" onClick={openModal}>
        {selectedCoupon ? "Change coupon" : "Apply Coupon"}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal} className="CouponModal__button">
          x
        </button>
        {couponCodes.map((coupon, index) => (
          <div
            onClick={() => handleCouponClick(index)}
            className="CouponModal__code"
            key={index}
          >
            {coupon.name}
          </div>
        ))}
      </Modal>
    </div>
  );
}

export default CouponModal;
