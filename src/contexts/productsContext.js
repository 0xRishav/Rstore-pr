import React, { createContext, useState, useEffect, useReducer } from "react";
import axios from "axios";
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
  const currentUser = useAuth();

  const addToCart = async (productId) => {
    dispatch({ type: "TOGGLE_LOADING" });
    try {
      const res = await axios.post(
        `https://rstoreapi.herokuapp.com/cart/${currentUser._id}`,
        {
          productId: productId,
          quantity: 1,
        }
      );
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
      } = await axios.delete(
        `https://rstoreapi.herokuapp.com/cart/${currentUser._id}/products/${productId}`
      );
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
      } = await axios.put(
        `https://rstoreapi.herokuapp.com/cart/${currentUser._id}/products/${productId}`,
        { quantity }
      );
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
      const res = await axios.post(
        `https://rstoreapi.herokuapp.com/wishlist/${currentUser._id}`,
        {
          productId,
        }
      );
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
      } = await axios.delete(
        `https://rstoreapi.herokuapp.com/wishlist/${currentUser._id}/products/${productId}`
      );
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
        return { ...state, products: action.payload };

      case "SET_CART":
        return { ...state, cart: [...action.payload] };

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

      case "TOGGLE_ITEM_IN_CART":
        return {
          ...state,
          products: state.products.map((ele) =>
            ele.id === action.payload
              ? { ...ele, isInCart: !ele.isInCart, quantity: 1 }
              : ele
          ),
        };

      case "TOGGLE_ITEM_IN_WISHLIST":
        return {
          ...state,
          products: state.products.map((ele) =>
            ele.id === action.payload
              ? { ...ele, isInWishlist: !ele.isInWishlist }
              : ele
          ),
        };

      case "INCREASE_QUANTITY":
        return {
          ...state,
          products: state.products.map((ele) =>
            ele.id === action.payload
              ? { ...ele, quantity: ele.quantity + 1 }
              : ele
          ),
        };

      case "DECREASE_QUANTITY":
        const index = state.products.findIndex(
          (ele, index) => ele.id === action.payload
        );
        if (state.products[index].quantity < 2) {
          return state;
        }
        return {
          ...state,
          products: state.products.map((ele) =>
            ele.id === action.payload
              ? { ...ele, quantity: ele.quantity - 1 }
              : ele
          ),
        };

      case "TOGGLE_SHOWFASTDELIVERY":
        return { ...state, showFastDeliveryOnly: !state.showFastDeliveryOnly };

      case "TOGGLE_SHOWFREESHIPPING":
        return { ...state, showFreeShippingOnly: !state.showFreeShippingOnly };

      case "FILTER_BY_PRICE":
        return {
          ...state,
          filterPrice: action.payload,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(ProductsReducer, initialState);

  useEffect(() => {
    (async function () {
      dispatch({ type: "TOGGLE_LOADING" });
      try {
        const response = await axios.get(
          "https://rstoreapi.herokuapp.com/products"
        );
        console.log(response);
        if (response.data.success) {
          dispatch({ type: "SET_PRODUCTS", payload: response.data.products });
        }
      } catch (err) {
        dispatch({ type: "TOGGLE_ERR" });
      }
      dispatch({ type: "TOGGLE_LOADING" });
    })();
  }, []);

  useEffect(() => {
    (async function () {
      dispatch({ type: "TOGGLE_LOADING" });
      try {
        const response = await axios.get(
          `https://rstoreapi.herokuapp.com/cart/${currentUser._id}`
        );
        console.log(response);
        if (response.data.success) {
          dispatch({ type: "SET_CART", payload: [...response.data.data] });
        }
      } catch (err) {
        dispatch({ type: "TOGGLE_ERR" });
      }
      dispatch({ type: "TOGGLE_LOADING" });
    })();
  }, []);

  useEffect(() => {
    (async function () {
      dispatch({ type: "TOGGLE_LOADING" });
      try {
        const response = await axios.get(
          `https://rstoreapi.herokuapp.com/wishlist/${currentUser._id}`
        );
        console.log(response);
        if (response.data.success) {
          dispatch({ type: "SET_WISHLIST", payload: [...response.data.data] });
        }
      } catch (err) {
        dispatch({ type: "TOGGLE_ERR" });
      }
      dispatch({ type: "TOGGLE_LOADING" });
    })();
  }, []);

  const getSortedDate = (productList, sortBy) => {
    if (sortBy && sortBy === "LOW_TO_HIGH") {
      return productList.sort((a, b) => a.price - b.price);
    } else if (sortBy && sortBy === "HIGH_TO_LOW") {
      return productList.sort((a, b) => b.price - a.price);
    }
    return productList;
  };

  const getFilteredData = (
    productList,
    { showFastDeliveryOnly, showFreeShippingOnly, filterPrice }
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

  const sortedData = getSortedDate(state.products, state.sortBy);
  const filteredData = getFilteredData(sortedData, { ...state });

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
