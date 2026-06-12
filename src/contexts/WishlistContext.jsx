import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/client";
import { useAuth } from "./authContext";

export const WishlistContext = createContext();

export const WishlistContextProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      (async function () {
        setIsLoading(true);
        try {
          const res = await api.get("/api/wishlist");
          if (res.data.success) {
            setWishlist(res.data.data);
          }
        } catch (err) {
          console.log(err);
        }
        setIsLoading(false);
      })();
    }
  }, [currentUser]);

  const addToWishlist = async (productId) => {
    setIsLoading(true);
    try {
      const res = await api.post("/api/wishlist", { productId });
      if (res.data.success) {
        setWishlist(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const removeFromWishlist = async (productId) => {
    setIsLoading(true);
    try {
      const {
        data: { data, success },
      } = await api.delete(`/api/wishlist/products/${productId}`);
      if (success) {
        setWishlist(data);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const clearWishlist = () => setWishlist([]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isLoading,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
