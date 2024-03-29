import React, { useContext } from "react";
import { Loader, Product, SortFilterWrapper } from "../../components";
import { ProductsContext } from "../../contexts/productsContext";
import "./MobilesPage.css";

function MobilesPage() {
  const { isLoading, filteredData, dispatch } =
    useContext(ProductsContext).products;
  const Mobiles = filteredData.filter(
    (product) => product.category === "Mobiles"
  );
  return (
    <div className="MobilesPage">
      <SortFilterWrapper />
      {isLoading && <Loader />}
      <div className="products-wrapper">
        {Mobiles.map((product, index) => (
          <Product
            key={product._id}
            {...product}
            dispatch={dispatch}
            id={product._id}
          />
        ))}
      </div>
    </div>
  );
}

export default MobilesPage;
