import React, { createContext, useEffect, useMemo, useState } from "react";
import api from "../api/client";

export const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const [showFastDeliveryOnly, setShowFastDeliveryOnly] = useState(false);
  const [showFreeShippingOnly, setShowFreeShippingOnly] = useState(false);
  const [filterPrice, setFilterPrice] = useState("150000");

  const toggleFastDelivery = () => setShowFastDeliveryOnly((prev) => !prev);
  const toggleFreeShipping = () => setShowFreeShippingOnly((prev) => !prev);

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

  const sortedData = useMemo(() => {
    if (sortBy === "LOW_TO_HIGH") {
      return [...products].sort((a, b) => a.price - b.price);
    }
    if (sortBy === "HIGH_TO_LOW") {
      return [...products].sort((a, b) => b.price - a.price);
    }
    return products;
  }, [products, sortBy]);

  const filteredData = useMemo(
    () =>
      sortedData
        .filter((p) => (showFastDeliveryOnly ? p.fastDelivery : true))
        .filter((p) => (showFreeShippingOnly ? p.freeShipping : true))
        .filter((p) => (filterPrice ? p.price <= filterPrice : true)),
    [sortedData, showFastDeliveryOnly, showFreeShippingOnly, filterPrice],
  );

  return (
    <ProductsContext.Provider
      value={{
        products,
        isLoading,
        sortBy,
        showFastDeliveryOnly,
        showFreeShippingOnly,
        filterPrice,
        filteredData,
        setSortBy,
        toggleFastDelivery,
        toggleFreeShipping,
        setFilterPrice,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
