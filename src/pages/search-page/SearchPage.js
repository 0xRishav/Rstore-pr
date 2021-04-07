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

  console.log("before");

  console.log("PRODS", products);

  const location = useLocation();

  console.log("after");

  return (
    <div className="SearchPage">
      <h1>This is Search page</h1>
      <SortFilterWrapper />

      {isLoading && <Loader />}
      <div className="products-wrapper">
        {products.map((product) => (
          <Product {...product} dispatch={dispatch} key={product.id} />
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
