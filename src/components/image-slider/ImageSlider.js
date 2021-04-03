import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ImageSlider.css";

const ImageSlider = ({ images, parent }) => {
  // takes in images as props
  const [index, setIndex] = useState(0); // create state to keep track of images index, set the default index to 0

  const slideRight = () => {
    setIndex((index + 1) % images.length); // increases index by 1
  };

  const slideLeft = () => {
    const nextIndex = index - 1;
    if (nextIndex < 0) {
      setIndex(images.length - 1); // returns last index of images array if index is less than 0
    } else {
      setIndex(nextIndex);
    }
  };

  return (
    images.length > 0 && (
      <div className="ImageSlider">
        <button
          onClick={slideLeft}
          className="ImageSlider__sliderBtn ImageSlider__sliderBtn--left"
        >
          {"<"}
        </button>
        <img className="bannerImage" src={images[index].imageUrl} alt={index} />
        <button
          onClick={slideRight}
          className="ImageSlider__sliderBtn ImageSlider__sliderBtn--right"
        >
          {">"}
        </button>
        {parent === "homepage" && (
          <div className="ImageSlider__linkBtnWrapper">
            <Link to={images[index].productUrl} className="ImageSlider__link">
              Buy This Product {`>`}
            </Link>
            <Link to="/products" className="ImageSlider__link">
              See All Products
            </Link>
          </div>
        )}
      </div>
    )
  );
};

export default ImageSlider;
