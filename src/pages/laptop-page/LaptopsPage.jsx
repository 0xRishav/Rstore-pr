import React from "react";
import { Loader, Product, SortFilterWrapper } from "../../components";
import { useProduct } from "../../helpers";
import "./LaptopsPage.css";

function LaptopsPage() {
  const { isLoading, filteredData, dispatch } = useProduct();
  const Laptops = filteredData.filter(
    (product) => product.category === "Laptop"
  );
  return (
    <div className="LaptopsPage">
      <SortFilterWrapper />
      {isLoading && <Loader />}
      <div className="products-wrapper">
        {Laptops.map((product, index) => (
          <Product
            id={product._id}
            {...product}
            dispatch={dispatch}
            key={product._id}
          />
        ))}
      </div>
    </div>
  );
}

export default LaptopsPage;
