import React, { useContext } from "react";
// import { Switch, Route } from "react-router-dom";
import { Switch, Route, withRouter } from "react-router-dom";
import { Navbar } from "..";
import { PrivateRoute, _ScrollToTop } from "../../helpers";
import {
  AllProductsPage,
  CartPage,
  Homepage,
  LaptopsPage,
  MobilesPage,
  SearchPage,
  SignInPage,
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
          <Route exact path="/" component={Homepage} />
          <div className="App">
            <Route path="/products" component={AllProductsPage} />
            <PrivateRoute path="/wishlist" component={WishlistPage} />
            {/* <Route path="/wishlist" component={WishlistPage} /> */}
            <Route path="/cart" component={CartPage} />
            <Route path="/tv" component={TVPage} />
            <Route path="/mobile" component={MobilesPage} />
            <Route path="/laptop" component={LaptopsPage} />
            <Route path="/watch" component={WatchPage} />
            <Route path="/product/:id" component={ProductPage} />
            <Route path="/search" component={SearchPage} />
            <Route path="/signin" component={SignInPage} />
          </div>
        </ScrollToTop>
      </Switch>
    </div>
  );
}

export default App;
