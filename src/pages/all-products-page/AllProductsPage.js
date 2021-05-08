import React, { useContext } from "react";
import {
  FilterCheckboxes,
  Loader,
  Product,
  SignInSignOutBtn,
  SortFilterWrapper,
  SortRadioBtns,
} from "../../components";
import { ProductsContext } from "../../contexts/productsContext";
import { useProduct } from "../../helpers";
import "./AllProductsPage.css";

function AllProductsPage() {
  const {
    products,
    isLoading,
    productsToShow,
    isErr,
    sortBy,
    showFastDeliveryOnly,
    showFreeShippingOnly,
    dispatch,
    filteredData,
    cart,
    wishlist,
  } = useProduct();
  console.log("WISHLIST", wishlist);

  // filteredData.map((product) => console.log(product));

  return (
    <div className="AllProductsPage">
      <div className="AllProductsPage__sortfilteSignBtnWrapper">
        <SortFilterWrapper />
        <SignInSignOutBtn />
      </div>

      {isLoading && <Loader />}
      <div className="products-wrapper">
        {filteredData.map((product) => (
          <Product
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
