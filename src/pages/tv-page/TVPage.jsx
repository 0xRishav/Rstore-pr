import React from "react";
import { Loader, Product, SortFilterWrapper } from "../../components";
import { useProduct } from "../../helpers";
import "./TVPage.css";

function TVPage() {
  const { isLoading, filteredData } = useProduct();
  const TVs = filteredData.filter((product) => product.category === "TV");
  return (
    <div className="TVPage">
      <SortFilterWrapper />
      {isLoading && <Loader />}
      <div className="products-wrapper">
        {TVs.map((product, index) => (
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

export default TVPage;
