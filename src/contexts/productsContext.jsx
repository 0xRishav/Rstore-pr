import React, { createContext, useEffect, useState } from "react";
import api from "../api/client";

export const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      try {
        const res = await api.get("/api/products");
        if (res.data.success) {
          setProducts(res.data.data);
        }
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <ProductsContext.Provider
      value={{ products, isLoading }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
