import React from "react";
import { SiOneplus, SiHp } from "react-icons/si";
import { AiFillApple } from "react-icons/ai";
import { BuyNowTextLinks, ImageSlider } from "../../components";
import "./Homepage.css";
import { featuredProducts, bannerImages, categories } from "../../data/homepage";

const logoMap = {
  oneplus: <SiOneplus color="red" className="Homepage__featuredProdLogo" />,
  hp: <SiHp color="#0091CF" className="Homepage__featuredProdLogo" />,
  apple: <AiFillApple color="black" className="Homepage__featuredProdLogo" />,
};

function Homepage() {

  return (
    <div className="Homepage">
      <ImageSlider images={bannerImages} parent="homepage" />

      {/* FEATURED PRODS */}
      <h2 className="Homepage__subHeading">Featured Products</h2>
      <div className="Homepage__featuredProductsWrapper">
        {featuredProducts.map((product, index) => (
          <div key={product._id} className="Homepage__featuredProductContainer">
            <img
              className="Homepage__featuredProdImage"
              src={product.imgSrc}
              alt={product.alt}
            />
            <div className="Homepage__infoContainer">
              <div className="Homepage__featuredProdName">
                {logoMap[product.logo]}
                {product.name}
              </div>
              <BuyNowTextLinks link={product.link} />
            </div>
          </div>
        ))}
      </div>

      <h2 className="Homepage__subHeading">Categories</h2>
      <div className="Homepage__categoryWrapper">
        {categories.map((category, index) => (
          <div key={index} className="Homepage__categoryContainer">
            <img
              src={category.imgSrc}
              alt={category.alt}
              className="Homepage__categoryImage"
            />
            <h2>{category.name}</h2>
            <BuyNowTextLinks link={category.link} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Homepage;
