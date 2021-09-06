import React, { useContext } from "react";
import { BuyNowTextLinks, ImageSlider, Navbar } from "../../components";
import { SiOneplus, SiHp } from "react-icons/si";
import { AiFillApple } from "react-icons/ai";
import "./Homepage.css";
import { Link } from "react-router-dom";
import { ProductsContext } from "../../contexts/productsContext";
import { useWindowDimensions } from "../../custom-hooks";
import { useProduct } from "../../helpers";

function Homepage() {
  const { products } = useProduct();
  const { width } = useWindowDimensions();

  const featuredProducts = [
    {
      name: "OnePlus 8T",
      imgSrc:
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/a71331107041495.5fac2c616f3ae.jpg",
      alt: "one-plus-phone",
      logo: <SiOneplus color="red" className="Homepage__featuredProdLogo" />,
      link: "/product/6091ff73fd79302e84dfe81b",
    },
    {
      name: "iPhone 11",
      imgSrc:
        "https://mir-s3-cdn-cf.behance.net/project_modules/disp/230a8486312713.5d9580970f876.jpg",
      alt: "iphone-11",
      logo: (
        <AiFillApple color="black" className="Homepage__featuredProdLogo" />
      ),
      link: "/product/6091ff73fd79302e84dfe816",
    },
    {
      name: "HP Spectre x360",
      imgSrc:
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400/131e2099947973.5efde4c45921a.jpg",
      alt: "HP-Spectre-x360",
      logo: <SiHp color="#0091CF" className="Homepage__featuredProdLogo" />,
      link: "/product/6091ff73fd79302e84dfe839",
    },
    {
      name: "Apple Macbook pro",
      imgSrc:
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/0a175488400949.5dd52df927373.jpg",
      alt: "Apple-Macbook-pro",
      logo: (
        <AiFillApple color="black" className="Homepage__featuredProdLogo" />
      ),
      link: "/product/6091ff73fd79302e84dfe83a",
    },
  ];

  const bannerImages = [
    // {
    //   imageUrl:
    //     width > 754
    //       ? "https://www.spark.co.nz/content/dam/telecomcms/responsive/images/shop/apple/iphone-12-pro/buy-now/buy-now-consumer/iphone12-buy-now-banner-mobile.jpg"
    //       : "https://www.apple.com/v/home/x/images/heroes/iphone-12-pro/iphone_12_pro_us__e5oyysg4k0ya_small_2x.jpg",
    //   productUrl: "/product/2",
    // },
    {
      imageUrl:
        "https://theaxo.com/wp-content/uploads/2020/10/OnePlus-8T-1024x576.jpg",
      productUrl: "/product/6091ff73fd79302e84dfe81b",
    },
    {
      imageUrl:
        "https://images.samsung.com/is/image/samsung/assets/in/smartphones/galaxy-s20/galaxy-s20-fe/Homepage_banner1440.jpg",
      productUrl: "/product/6091ff73fd79302e84dfe820",
    },
  ];

  const categories = [
    {
      name: "Mobile",
      imgSrc:
        "https://fdn.gsmarena.com/imgroot/news/20/08/huawei-y9a-specs-design-ad-banner/-1220x526/gsmarena_004.jpg",
      alt: "mobiles-banner",
      link: "/mobile",
    },
    {
      name: "Laptop",
      imgSrc:
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/3c018587711043.5dc0b3f75a8ca.jpg",
      alt: "laptops-banner",
      link: "/laptop",
    },
    {
      name: "TV",
      imgSrc:
        "https://oasis.opstatics.com/content/dam/oasis/page/store/tv/new/New-TV_Banner_1600x1200.jpg",
      alt: "TV-banner",
      link: "/tv",
    },
    {
      name: "Smart Watch",
      imgSrc:
        "https://cdn.dribbble.com/users/1146422/screenshots/6781898/main.png?compress=1&resize=800x600",
      alt: "Watch-banner",
      link: "/watch",
    },
  ];

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
                {product.logo}
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
