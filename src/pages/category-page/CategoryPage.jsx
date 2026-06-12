import React from "react";
import { Loader, Product, SortFilterWrapper } from "../../components";
import { useProduct } from "../../helpers";

function CategoryPage({ category }) {
  const { isLoading, filteredData } = useProduct();
  const filtered = filteredData.filter(
    (product) => product.category === category
  );
  return (
    <div className="CategoryPage">
      <SortFilterWrapper />
      {isLoading && <Loader />}
      <div className="products-wrapper">
        {filtered.map((product) => (
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

export default CategoryPage;
