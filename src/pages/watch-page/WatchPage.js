import React, { useContext } from "react";
import { Loader, Product } from "../../components";
import { ProductsContext } from "../../contexts/productsContext";
import "./WatchPage.css";

function WatchPage() {
  const { isLoading, filteredData, dispatch } = useContext(
    ProductsContext
  ).products;
  const Watches = filteredData.filter(
    (product) => product.category === "Watch"
  );
  return (
    <div className="WatchPage.css">
      {isLoading && <Loader />}
      <div className="products-wrapper">
        {Watches.map((product) => (
          <Product {...product} dispatch={dispatch} key={product.id} />
        ))}
      </div>
    </div>
  );
}

export default WatchPage;
