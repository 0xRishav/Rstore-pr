import React, { useContext } from "react";
import {
  FilterCheckboxes,
  Loader,
  Product,
  SortFilterWrapper,
  SortRadioBtns,
} from "../../components";
import { ProductsContext } from "../../contexts/productsContext";
import "./AllProductsPage.css";

function AllProductsPage() {
  const {
    products,
    isLoading,
    productsToShow,
    isErr,
    sortBy,
    showFastDeliveryOnly,
    showFreeShippingOnly,
    dispatch,
    filteredData,
  } = useContext(ProductsContext).products;

  return (
    <div className="AllProductsPage">
      <SortFilterWrapper />

      {isLoading && <Loader />}
      <div className="products-wrapper">
        {filteredData.map((product) => (
          <Product {...product} dispatch={dispatch} key={product.id} />
        ))}
      </div>
    </div>
  );
}

export default AllProductsPage;
