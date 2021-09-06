import React, { useContext, useState } from "react";
import { Loader, Product, SortFilterWrapper } from "../../components";
import { ProductsContext } from "../../contexts/productsContext";
import "./WatchPage.css";

function WatchPage() {
  const { isLoading, filteredData, dispatch } =
    useContext(ProductsContext).products;

  const Watches = filteredData.filter(
    (product) => product.category === "Watch"
  );

  return (
    <div className="WatchPage">
      <SortFilterWrapper />

      {isLoading && <Loader />}
      <div className="products-wrapper">
        {Watches.map((product, index) => (
          <Product
            key={index}
            {...product}
            dispatch={dispatch}
            key={product._id}
          />
        ))}
      </div>
    </div>
  );
}

export default WatchPage;
