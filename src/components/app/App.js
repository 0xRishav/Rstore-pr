import React, { useContext } from "react";
// import { Switch, Route } from "react-router-dom";
import { Switch, Route, withRouter } from "react-router-dom";
import { Navbar } from "..";
import { _ScrollToTop } from "../../helpers";
import {
  AllProductsPage,
  CartPage,
  Homepage,
  LaptopsPage,
  MobilesPage,
  TVPage,
  WatchPage,
  WishlistPage,
} from "../../pages";
import ProductPage from "../product-page/ProductPage";

import "./App.css";

function App() {
  const ScrollToTop = withRouter(_ScrollToTop);

  return (
    <div className="App__wrapper">
      <Navbar />
      <Switch>
        <ScrollToTop>
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
            <Route path="/tv">
              <TVPage />
            </Route>
            <Route path="/mobile">
              <MobilesPage />
            </Route>
            <Route path="/laptop">
              <LaptopsPage />
            </Route>
            <Route path="/watch">
              <WatchPage />
            </Route>
            <Route path="/product/:id">
              <ProductPage />
            </Route>
          </div>
        </ScrollToTop>
      </Switch>
    </div>
  );
}

export default App;
