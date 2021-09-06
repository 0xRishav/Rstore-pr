import React from "react";
import {
  Loader,
  Product,
  SignInSignOutBtn,
  SortFilterWrapper,
} from "../../components";
import { useProduct } from "../../helpers";
import "./AllProductsPage.css";

function AllProductsPage() {
  const { isLoading, dispatch, filteredData } = useProduct();

  return (
    <div className="AllProductsPage">
      <div className="AllProductsPage__sortfilteSignBtnWrapper">
        <SortFilterWrapper />
        {/* <SignInSignOutBtn /> */}
      </div>

      {isLoading && <Loader />}
      <div className="products-wrapper">
        {filteredData.map((product) => (
          <Product
            key={product._id}
            {...product}
            id={product._id}
            dispatch={dispatch}
            key={product._id}
          />
        ))}
      </div>
    </div>
  );
}

export default AllProductsPage;
