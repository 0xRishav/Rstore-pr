import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/client";
import { useAuth } from "./authContext";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      (async function () {
        setIsLoading(true);
        try {
          const res = await api.get("/api/cart");
          if (res.data.success) {
            setCart(res.data.data);
          }
        } catch (err) {
          console.log(err);
        }
        setIsLoading(false);
      })();
    }
  }, [currentUser]);

  const addToCart = async (productId) => {
    setIsLoading(true);
    try {
      const res = await api.post("/api/cart", { productId });
      if (res.data.success) {
        setCart(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const removeFromCart = async (productId) => {
    setIsLoading(true);
    try {
      const {
        data: { data, success },
      } = await api.delete(`/api/cart/products/${productId}`);
      if (success) {
        setCart(data);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const changeQuantity = async (productId, quantity) => {
    setIsLoading(true);
    try {
      const {
        data: { data, success },
      } = await api.put(`/api/cart/products/${productId}`, { quantity });
      if (success) {
        setCart(data);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        addToCart,
        removeFromCart,
        changeQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
