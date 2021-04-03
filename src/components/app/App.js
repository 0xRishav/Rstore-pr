import React, { useContext } from "react";
// import { Switch, Route } from "react-router-dom";
import { Switch, Route, Router } from "react-router-dom";
import { Navbar } from "..";
import { AllProductsPage, CartPage, Homepage, WishlistPage } from "../../pages";
import ProductPage from "../product-page/ProductPage";

import "./App.css";

function App() {
  return (
    <div className="App__wrapper">
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <div className="App">
          <Route path="/products">
            <AllProductsPage />
          </Route>
          <Route path="/wishlist">
            <WishlistPage />
          </Route>
          <Route path="/cart">
            <CartPage />
          </Route>
          <Route path="/product/:id">
            <ProductPage />
          </Route>
        </div>
      </Switch>
    </div>
  );
}

export default App;
