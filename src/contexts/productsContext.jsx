import React, { createContext, useEffect, useMemo, useReducer } from "react";
import api from "../api/client";
import { useAuth } from "./authContext";

export const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
  const initialState = {
    products: [],
    cart: [],
    wishlist: [],
    isLoading: false,
    productsToShow: "AllProducts",
    isErr: false,
    sortBy: null,
    showFastDeliveryOnly: false,
    showFreeShippingOnly: false,
    filterPrice: false,
  };

  const { currentUser } = useAuth();

  const addToCart = async (productId) => {
    dispatch({ type: "TOGGLE_LOADING" });
    try {
      const res = await api.post(`/api/cart`, {
        productId: productId,
        // quantity: 1,
      });
      if (res.data.success) {
        dispatch({ type: "SET_CART", payload: [...res.data.data] });
      }
      dispatch({ type: "TOGGLE_LOADING" });
    } catch (error) {
      console.log(error);
      dispatch({ type: "TOGGLE_LOADING" });
    }
  };

  const removeFromCart = async (productId) => {
    dispatch({ type: "TOGGLE_LOADING" });
    try {
      const {
        data: { data, success },
      } = await api.delete(`/api/cart/products/${productId}`);
      if (success) {
        dispatch({ type: "SET_CART", payload: [...data] });
      }
      dispatch({ type: "TOGGLE_LOADING" });
    } catch (error) {
      console.log(error);
      dispatch({ type: "TOGGLE_LOADING" });
    }
  };

  const changeQuantity = async (productId, quantity) => {
    dispatch({ type: "TOGGLE_LOADING" });
    try {
      const {
        data: { data, success },
      } = await api.put(`/api/cart/products/${productId}`, {
        quantity: quantity,
      });
      if (success) {
        dispatch({ type: "SET_CART", payload: [...data] });
      }
      dispatch({ type: "TOGGLE_LOADING" });
    } catch (error) {
      console.log(error);
      dispatch({ type: "TOGGLE_LOADING" });
    }
  };

  const addToWishlist = async (productId) => {
    dispatch({ type: "TOGGLE_LOADING" });
    try {
      const res = await api.post(`/api/wishlist`, {
        productId,
      });
      if (res.data.success) {
        dispatch({ type: "SET_WISHLIST", payload: [...res.data.data] });
      }
      dispatch({ type: "TOGGLE_LOADING" });
    } catch (error) {
      console.log(error);
      dispatch({ type: "TOGGLE_LOADING" });
    }
  };

  const removeFromWishlist = async (productId) => {
    dispatch({ type: "TOGGLE_LOADING" });
    try {
      const {
        data: { data, success },
      } = await api.delete(`/api/wishlist/products/${productId}`);
      if (success) {
        dispatch({ type: "SET_WISHLIST", payload: [...data] });
      }
      dispatch({ type: "TOGGLE_LOADING" });
    } catch (error) {
      console.log(error);
      dispatch({ type: "TOGGLE_LOADING" });
    }
  };

  const ProductsReducer = (state, action) => {
    switch (action.type) {
      case "SET_PRODUCTS":
        return { ...state, products: [...action.payload] };

      case "SET_CART":
        return {
          ...state,
          cart: [...action.payload],
        };

      case "SET_WISHLIST":
        return { ...state, wishlist: [...action.payload] };

      case "TOGGLE_LOADING":
        return { ...state, isLoading: !state.isLoading };

      case "PRODUCTS_TO_SHOW":
        return { ...state, productsToShow: action.payload };

      case "SORT_BY":
        return { ...state, sortBy: action.payload };

      case "TOGGLE_ERR":
        return { ...state, isErr: !state.isErr };

      case "TOGGLE_SHOWFASTDELIVERY":
        return { ...state, showFastDeliveryOnly: !state.showFastDeliveryOnly };

      case "TOGGLE_SHOWFREESHIPPING":
        return { ...state, showFreeShippingOnly: !state.showFreeShippingOnly };

      case "FILTER_BY_PRICE":
        return {
          ...state,
          filterPrice: action.payload,
        };
      case "CLEAR_USER_STATE":
        return { ...state, cart: [], wishlist: [] };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(ProductsReducer, initialState);

  useEffect(() => {
    (async function () {
      dispatch({ type: "TOGGLE_LOADING" });
      try {
        const productResponse = await api.get("/api/products");
        if (productResponse.data.success) {
          dispatch({
            type: "SET_PRODUCTS",
            payload: [...productResponse.data.data],
          });
        }
      } catch (err) {
        dispatch({ type: "TOGGLE_ERR" });
      }
      dispatch({ type: "TOGGLE_LOADING" });
    })();
  }, [currentUser]);

  useEffect(() => {
    (async function () {
      if (currentUser) {
        dispatch({ type: "TOGGLE_LOADING" });
        try {
          const cartResponse = await api.get(`/api/cart`);
          if (cartResponse.data.success) {
            dispatch({
              type: "SET_CART",
              payload: [...cartResponse.data.data],
            });
          }
        } catch (err) {
          dispatch({ type: "TOGGLE_ERR" });
        }
        dispatch({ type: "TOGGLE_LOADING" });
      }
    })();
  }, [currentUser]);

  useEffect(() => {
    (async function () {
      if (currentUser) {
        dispatch({ type: "TOGGLE_LOADING" });
        try {
          const wishlistResponse = await api.get(`/api/wishlist`);
          if (wishlistResponse.data.success) {
            dispatch({
              type: "SET_WISHLIST",
              payload: [...wishlistResponse.data.data],
            });
          }
        } catch (err) {
          dispatch({ type: "TOGGLE_ERR" });
        }
        dispatch({ type: "TOGGLE_LOADING" });
      }
    })();
  }, [currentUser]);

  const getSortedDate = (productList, sortBy) => {
    if (sortBy && sortBy === "LOW_TO_HIGH") {
      return [...productList].sort((a, b) => a.price - b.price);
    } else if (sortBy && sortBy === "HIGH_TO_LOW") {
      return [...productList].sort((a, b) => b.price - a.price);
    }
    return productList;
  };

  const getFilteredData = (
    productList,
    { showFastDeliveryOnly, showFreeShippingOnly, filterPrice },
  ) => {
    return productList
      .filter((product) => {
        return showFastDeliveryOnly ? product.fastDelivery : true;
      })
      .filter((product2) => {
        return showFreeShippingOnly ? product2.freeShipping : true;
      })
      .filter((product3) => {
        return filterPrice ? product3.price <= filterPrice : true;
      });
  };

  const sortedData = useMemo(
    () => getSortedDate(state.products, state.sortBy),
    [state.products, state.sortBy],
  );
  const filteredData = useMemo(
    () =>
      getFilteredData(sortedData, {
        showFastDeliveryOnly: state.showFastDeliveryOnly,
        showFreeShippingOnly: state.showFreeShippingOnly,
        filterPrice: state.filterPrice,
      }),
    [
      sortedData,
      state.showFastDeliveryOnly,
      state.showFreeShippingOnly,
      state.filterPrice,
    ],
  );

  return (
    <ProductsContext.Provider
      value={{
        products: {
          ...state,
          dispatch,
          filteredData,
          addToCart,
          removeFromCart,
          addToWishlist,
          removeFromWishlist,
          changeQuantity,
        },
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
