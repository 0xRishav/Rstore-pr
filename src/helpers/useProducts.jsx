import { useContext } from "react";
import { ProductsContext } from "../contexts/productsContext";

const useProduct = () => {
  return useContext(ProductsContext);
};

export default useProduct;
