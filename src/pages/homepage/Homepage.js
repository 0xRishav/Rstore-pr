import React, { useContext } from "react";
import { BuyNowTextLinks, ImageSlider, Navbar } from "../../components";
import { SiOneplus, SiHp } from "react-icons/si";
import { AiFillApple } from "react-icons/ai";
import "./Homepage.css";
import { Link } from "react-router-dom";
import { ProductsContext } from "../../contexts/productsContext";
import { useWindowDimensions } from "../../custom-hooks";

function Homepage() {
  const { products } = useContext(ProductsContext).products;
  console.log(products);
  const { width } = useWindowDimensions();

  const bannerImages = [
    {
      imageUrl:
        width > 754
          ? "https://www.spark.co.nz/content/dam/telecomcms/responsive/images/shop/apple/iphone-12-pro/buy-now/buy-now-consumer/iphone12-buy-now-banner-mobile.jpg"
          : "https://www.apple.com/v/home/x/images/heroes/iphone-12-pro/iphone_12_pro_us__e5oyysg4k0ya_small_2x.jpg",
      productUrl: "/product/2",
    },
    {
      imageUrl:
        "https://theaxo.com/wp-content/uploads/2020/10/OnePlus-8T-1024x576.jpg",
      productUrl: "/product/6",
    },
    {
      imageUrl:
        "https://images.samsung.com/is/image/samsung/assets/in/smartphones/galaxy-s20/galaxy-s20-fe/Homepage_banner1440.jpg",
      productUrl: "/product/12",
    },
  ];

  return (
    <div className="Homepage">
      <ImageSlider images={bannerImages} parent="homepage" />
      <h2 className="Homepage__subHeading">Featured Products</h2>
      <div className="Homepage__featuredProductsWrapper">
        <div className="Homepage__featuredProductContainer">
          <img
            className="Homepage__featuredProdImage"
            src="https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/a71331107041495.5fac2c616f3ae.jpg"
            alt="oneplus-phone"
          />
          <div className="Homepage__infoContainer">
            <div className="Homepage__featuredProdName">
              <SiOneplus color="red" className="Homepage__featuredProdLogo" />
              OnePlus 8T
            </div>
            <BuyNowTextLinks link="/product/6" />
          </div>
        </div>

        <div className="Homepage__featuredProductContainer">
          <div className="Homepage__infoContainer">
            <div className="Homepage__featuredProdName">
              <AiFillApple
                color="black"
                className="Homepage__featuredProdLogo"
              />
              iPhone 11
            </div>
            <BuyNowTextLinks link="/product/1" />
          </div>
          <img
            className="Homepage__featuredProdImage"
            src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/230a8486312713.5d9580970f876.jpg"
            alt="iphone11"
          />
        </div>

        <div className="Homepage__featuredProductContainer">
          <img
            className="Homepage__featuredProdImage"
            src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/131e2099947973.5efde4c45921a.jpg"
            alt="oneplus-phone"
          />
          <div className="Homepage__infoContainer">
            <div className="Homepage__featuredProdName">
              <SiHp color="#0091CF" className="Homepage__featuredProdLogo" />
              HP Spectre x360
            </div>
            <BuyNowTextLinks link="/product/36" />
          </div>
        </div>
      </div>

      <div className="Homepage__featuredProductContainer">
        <div className="Homepage__infoContainer">
          <div className="Homepage__featuredProdName">
            <AiFillApple color="black" className="Homepage__featuredProdLogo" />
            Apple MacBook Pro
          </div>
          <BuyNowTextLinks link="/product/37" />
        </div>
        <img
          className="Homepage__featuredProdImage macbookpro-img"
          src="https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/0a175488400949.5dd52df927373.jpg"
          alt="macbookpro"
        />
      </div>

      <h2 className="Homepage__subHeading">Categories</h2>
      <div className="Homepage__categoryWrapper">
        <div className="Homepage__categoryContainer">
          <img
            src="https://fdn.gsmarena.com/imgroot/news/20/08/huawei-y9a-specs-design-ad-banner/-1220x526/gsmarena_004.jpg"
            alt="mobiles-banner"
            className="Homepage__categoryImage"
          />
          <h2>Mobile</h2>
          <BuyNowTextLinks link="/mobile" />
        </div>
        <div className="Homepage__categoryContainer">
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/3c018587711043.5dc0b3f75a8ca.jpg"
            alt="laptop-banner"
            className="Homepage__categoryImage"
          />
          <h2>Laptop</h2>
          <BuyNowTextLinks link="/laptop" />
        </div>
        <div className="Homepage__categoryContainer">
          <img
            src="https://oasis.opstatics.com/content/dam/oasis/page/store/tv/new/New-TV_Banner_1600x1200.jpg"
            alt="TV-banner"
            className="Homepage__categoryImage"
          />
          <h2>TV</h2>
          <BuyNowTextLinks link="/tv" />
        </div>
        <div className="Homepage__categoryContainer">
          <img
            src="https://cdn.dribbble.com/users/1146422/screenshots/6781898/main.png?compress=1&resize=800x600"
            alt=""
            className="Homepage__categoryImage"
          />
          <h2>Smart Watch</h2>
          <BuyNowTextLinks link="/watch" />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
