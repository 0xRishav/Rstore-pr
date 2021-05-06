import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./components";
import reportWebVitals from "./reportWebVitals";
import setupMockServer from "./api/mock.server";
import { ProductsContextProvider } from "./contexts/productsContext";
import { BrowserRouter } from "react-router-dom";
import ProductPage from "./components/product-page/ProductPage";
import Homepage from "./pages/homepage/Homepage";
import { WishlistPage, CartPage, AllProductsPage } from "./pages";
import { AuthContextProvider } from "./contexts/authContext";

// setupMockServer();

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProductsContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProductsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
