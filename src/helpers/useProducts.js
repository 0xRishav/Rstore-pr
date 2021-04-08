import { useContext } from "react";
import { ProductsContext } from "../contexts/productsContext";

const useProduct = () => {
  const obj = useContext(ProductsContext).products;
  return obj;
};

export default useProduct;
