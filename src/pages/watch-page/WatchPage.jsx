import React from "react";
import { Loader, Product, SortFilterWrapper } from "../../components";
import { useProduct } from "../../helpers";
import "./WatchPage.css";

function WatchPage() {
  const { isLoading, filteredData } = useProduct();

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
            key={product._id}
            {...product}
            id={product._id}
          />
        ))}
      </div>
    </div>
  );
}

export default WatchPage;
