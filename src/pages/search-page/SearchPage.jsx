import React from "react";
import { useLocation } from "react-router-dom";
import { Loader, Product, SortFilterWrapper } from "../../components";
import { useProduct } from "../../helpers";
import "./SearchPage.css";

function SearchPage() {
  const { isLoading, dispatch } = useProduct();

  const location = useLocation();
  const { filteredProducts } = location.state || {};

  return (
    <div className="SearchPage">
      <SortFilterWrapper />

      {isLoading && <Loader />}
      {filteredProducts && filteredProducts?.length === 0 ? (
        <h1>No Such Product is available</h1>
      ) : (
        <div className="products-wrapper">
          {filteredProducts.map((product, index) => (
            <Product
              key={product._id}
              {...product}
              dispatch={dispatch}
              id={product._id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
