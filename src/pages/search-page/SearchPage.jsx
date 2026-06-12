import { useLocation } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { Product, EmptyState } from "../../components";
import "./SearchPage.css";

function SearchPage() {
  const location = useLocation();
  const { filteredProducts } = location.state || {};

  return (
    <div className="search-page">
      <div className="search-page__header">
        <h1 className="search-page__title">
          Search Results
        </h1>
        {filteredProducts && (
          <span className="search-page__count">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
          </span>
        )}
      </div>

      {!filteredProducts || filteredProducts.length === 0 ? (
        <EmptyState
          message="No products match your search"
          linkTo="/products"
          linkText="Browse All Products"
          icon={<FiSearch size={40} />}
        />
      ) : (
        <div className="products-wrapper">
          {filteredProducts.map((product) => (
            <Product key={product._id} {...product} id={product._id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
