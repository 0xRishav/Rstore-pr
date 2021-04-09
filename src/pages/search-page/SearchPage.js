import React, { useContext } from "react";
import { useLocation } from "react-router";
import {
  FilterCheckboxes,
  Loader,
  Product,
  SortFilterWrapper,
  SortRadioBtns,
} from "../../components";
import { ProductsContext } from "../../contexts/productsContext";
import "./SearchPage.css";

function SearchPage() {
  const { products, isLoading, dispatch, filteredData } = useContext(
    ProductsContext
  ).products;

  const location = useLocation();
  const { filteredProducts } = location.state;
  console.log(location);

  return (
    <div className="SearchPage">
      <SortFilterWrapper />

      {isLoading && <Loader />}
      {filteredProducts.length === 0 ? (
        <h1>No Such Product is available</h1>
      ) : (
        <div className="products-wrapper">
          {filteredProducts.map((product) => (
            <Product {...product} dispatch={dispatch} key={product.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
