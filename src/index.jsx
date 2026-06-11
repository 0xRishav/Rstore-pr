import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./components";
import reportWebVitals from "./reportWebVitals";
import { ProductsContextProvider } from "./contexts/productsContext";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./contexts/authContext";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProductsContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProductsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

reportWebVitals();
