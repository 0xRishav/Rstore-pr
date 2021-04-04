import React, { useContext } from "react";
import { Loader, Product, SortFilterWrapper } from "../../components";
import { ProductsContext } from "../../contexts/productsContext";
import "./MobilesPage.css";

function MobilesPage() {
  const { isLoading, filteredData, dispatch } = useContext(
    ProductsContext
  ).products;
  const Mobiles = filteredData.filter(
    (product) => product.category === "Mobiles"
  );
  return (
    <div className="MobilesPage">
      <SortFilterWrapper />
      {isLoading && <Loader />}
      <div className="products-wrapper">
        {Mobiles.map((product) => (
          <Product {...product} dispatch={dispatch} key={product.id} />
        ))}
      </div>
    </div>
  );
}

export default MobilesPage;
