import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight, FiArrowRight } from "react-icons/fi";
import { heroSlides, featuredProducts, categories, features } from "../../data/homepage";
import "./Homepage.css";

function Homepage() {
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[heroIndex];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        {heroSlides.map((s, i) => (
          <div
            key={i}
            className={`hero__slide ${i === heroIndex ? "hero__slide--active" : ""}`}
          >
            <div className="hero__image-wrapper">
              <img src={s.imageUrl} alt={s.title} className="hero__image" />
              <div className="hero__overlay" />
            </div>
          </div>
        ))}

        <div className="hero__content">
          <h1 className="hero__title">{slide.title}</h1>
          <p className="hero__description">{slide.description}</p>
          <Link to={slide.productUrl} className="btn btn--primary btn--lg">
            Shop Now <FiArrowRight size={18} />
          </Link>
        </div>

        <div className="hero__dots">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              className={`hero__dot ${i === heroIndex ? "hero__dot--active" : ""}`}
              onClick={() => setHeroIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          className="hero__arrow hero__arrow--left"
          onClick={() => setHeroIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          aria-label="Previous slide"
        >
          <FiChevronLeft size={24} />
        </button>
        <button
          className="hero__arrow hero__arrow--right"
          onClick={() => setHeroIndex((prev) => (prev + 1) % heroSlides.length)}
          aria-label="Next slide"
        >
          <FiChevronRight size={24} />
        </button>
      </section>

      {/* Featured Products */}
      <section className="section">
        <div className="section__header">
          <h2 className="section__title">Featured Products</h2>
          <Link to="/products" className="section__link">
            View All <FiArrowRight size={16} />
          </Link>
        </div>
        <div className="featured-grid">
          {featuredProducts.map((product) => (
            <Link key={product._id} to={product.link} className="featured-card">
              <div className="featured-card__image-wrapper">
                <img
                  className="featured-card__image"
                  src={product.imgSrc}
                  alt={product.name}
                  loading="lazy"
                />
              </div>
              <div className="featured-card__info">
                <h3 className="featured-card__name">{product.name}</h3>
                <p className="featured-card__price">Rs. {product.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="section section--alt">
        <div className="section__header">
          <h2 className="section__title">Shop by Category</h2>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <Link key={category.name} to={category.link} className="category-card">
              <div className="category-card__image-wrapper">
                <img
                  className="category-card__image"
                  src={category.imgSrc}
                  alt={category.name}
                  loading="lazy"
                />
                <div className="category-card__overlay" />
              </div>
              <div className="category-card__label">
                <span className="category-card__name">{category.name}</span>
                <FiArrowRight className="category-card__arrow" size={18} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why RStore */}
      <section className="section">
        <div className="features-row">
          {features.map((feature) => (
            <div key={feature.title} className="feature-card">
              <span className="feature-card__icon">{feature.icon}</span>
              <h3 className="feature-card__title">{feature.title}</h3>
              <p className="feature-card__description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Homepage;
