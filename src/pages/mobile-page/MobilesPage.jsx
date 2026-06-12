import React from "react";
import { Loader, Product, SortFilterWrapper } from "../../components";
import { useProduct } from "../../helpers";
import "./MobilesPage.css";

function MobilesPage() {
  const { isLoading, filteredData } = useProduct();
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
            id={product._id}
          />
        ))}
      </div>
    </div>
  );
}

export default MobilesPage;
