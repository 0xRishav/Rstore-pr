import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./components";
import { ProductsContextProvider } from "./contexts/productsContext";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./contexts/authContext";
import _ScrollToTop from "./helpers/_ScrollToTop";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProductsContextProvider>
        <BrowserRouter>
          <_ScrollToTop />
          <App />
        </BrowserRouter>
      </ProductsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

