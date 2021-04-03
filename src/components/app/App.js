import React, { useContext, useEffect, useState } from "react";
import {
  Loader,
  Navbar,
  Product,
  CartProduct,
  Checkbox,
  SortRadioBtns,
  FilterCheckboxes,
  CouponModal,
} from "../index";
import { ProductsContext } from "../../contexts/productsContext";
import "./App.css";

function App() {
  const {
    products,
    isLoading,
    productsToShow,
    isErr,
    sortBy,
    showFastDeliveryOnly,
    showFreeShippingOnly,
    dispatch,
  } = useContext(ProductsContext).products;

  const getSortedDate = (productList, sortBy) => {
    if (sortBy && sortBy === "LOW_TO_HIGH") {
      return productList.sort((a, b) => a.price - b.price);
    } else if (sortBy && sortBy === "HIGH_TO_LOW") {
      return productList.sort((a, b) => b.price - a.price);
    }
    return productList;
  };

  const getFilteredData = (
    productList,
    { showFastDeliveryOnly, showFreeShippingOnly }
  ) => {
    return productList
      .filter((product) => {
        return showFastDeliveryOnly ? product.fastDelivery : true;
      })
      .filter((product2) => {
        return showFreeShippingOnly ? product2.freeShipping : true;
      });
  };

  const sortedData = getSortedDate(products, sortBy);
  const filteredData = getFilteredData(sortedData, {
    showFastDeliveryOnly,
    showFreeShippingOnly,
  });

  return (
    <div className="App__wrapper">
      <Navbar />
      <div className="App">
        <div className="App__checkboxRadioBtnWrapper">
          {productsToShow === "AllProducts" && <SortRadioBtns />}
          {productsToShow === "AllProducts" && <FilterCheckboxes />}
        </div>

        {isLoading && <Loader />}
        <div className="products-wrapper">
          {productsToShow === "AllProducts" &&
            filteredData.map((product) => (
              <Product {...product} dispatch={dispatch} key={product.id} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
