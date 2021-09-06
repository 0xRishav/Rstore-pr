import React, { useContext } from "react";
import { useLocation } from "react-router";
import { Loader, Product, SortFilterWrapper } from "../../components";
import { ProductsContext } from "../../contexts/productsContext";
import "./SearchPage.css";

function SearchPage() {
  const { isLoading, dispatch } = useContext(ProductsContext).products;

  const location = useLocation();
  const { filteredProducts } = location.state;

  return (
    <div className="SearchPage">
      <SortFilterWrapper />

      {isLoading && <Loader />}
      {filteredProducts.length === 0 ? (
        <h1>No Such Product is available</h1>
      ) : (
        <div className="products-wrapper">
          {filteredProducts.map((product, index) => (
            <Product
              key={index}
              {...product}
              dispatch={dispatch}
              key={product._id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
