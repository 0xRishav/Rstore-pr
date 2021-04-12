import React, { useContext } from "react";
import { Loader, Product, SortFilterWrapper } from "../../components";
import { ProductsContext } from "../../contexts/productsContext";
import "./TVPage.css";

function TVPage() {
  const { isLoading, filteredData, dispatch } = useContext(
    ProductsContext
  ).products;
  const TVs = filteredData.filter((product) => product.category === "TV");
  return (
    <div className="TVPage">
      <SortFilterWrapper />
      {isLoading && <Loader />}
      <div className="products-wrapper">
        {TVs.map((product) => (
          <Product {...product} dispatch={dispatch} key={product.id} />
        ))}
      </div>
    </div>
  );
}

export default TVPage;
