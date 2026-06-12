import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App, ErrorBoundary } from "./components";
import { ProductsContextProvider } from "./contexts/productsContext";
import { CartContextProvider } from "./contexts/CartContext";
import { WishlistContextProvider } from "./contexts/WishlistContext";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./contexts/authContext";
import _ScrollToTop from "./helpers/_ScrollToTop";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProductsContextProvider>
        <CartContextProvider>
          <WishlistContextProvider>
            <BrowserRouter>
          <_ScrollToTop />
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
          </BrowserRouter>
          </WishlistContextProvider>
        </CartContextProvider>
      </ProductsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

