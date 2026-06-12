import React from "react";
import { useLocation } from "react-router-dom";
import { Loader, Product, SortFilterWrapper, EmptyState } from "../../components";
import { useProduct } from "../../helpers";
import "./SearchPage.css";

function SearchPage() {
  const { isLoading } = useProduct();

  const location = useLocation();
  const { filteredProducts } = location.state || {};

  return (
    <div className="SearchPage">
      <SortFilterWrapper />

      {isLoading && <Loader />}
      {filteredProducts && filteredProducts?.length === 0 ? (
        <EmptyState message="No products match your search" icon="🔍" />
      ) : (
        <div className="products-wrapper">
          {filteredProducts.map((product, index) => (
            <Product
              key={product._id}
              {...product}
              id={product._id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
