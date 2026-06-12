import React from "react";
import { Loader, Product, SortFilterWrapper } from "../../components";
import { useProduct } from "../../helpers";
import "./LaptopsPage.css";

function LaptopsPage() {
  const { isLoading, filteredData } = useProduct();
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
            key={product._id}
            {...product}
            id={product._id}
          />
        ))}
      </div>
    </div>
  );
}

export default LaptopsPage;
