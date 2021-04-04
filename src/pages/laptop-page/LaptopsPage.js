import React, { useContext } from "react";
import { Loader, Product, SortFilterWrapper } from "../../components";
import { ProductsContext } from "../../contexts/productsContext";
import "./LaptopsPage.css";

function LaptopsPage() {
  const { isLoading, filteredData, dispatch } = useContext(
    ProductsContext
  ).products;
  const Laptops = filteredData.filter(
    (product) => product.category === "Laptop"
  );
  return (
    <div className="LaptopsPage">
      <SortFilterWrapper />
      {isLoading && <Loader />}
      <div className="products-wrapper">
        {Laptops.map((product) => (
          <Product {...product} dispatch={dispatch} key={product.id} />
        ))}
      </div>
    </div>
  );
}

export default LaptopsPage;
