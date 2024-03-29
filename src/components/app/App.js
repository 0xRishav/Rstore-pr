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
  SignUpPage,
  ProfilePage,
} from "../../pages";
import ProductPage from "../product-page/ProductPage";

import "./App.css";

function App() {
  const ScrollToTop = withRouter(_ScrollToTop);

  return (
    <>
      <Navbar />
      <Route exact path="/" component={Homepage} />
      <div className="App__wrapper">
        <Switch>
          <ScrollToTop>
            <div className="App">
              <Route path="/products" component={AllProductsPage} />
              <PrivateRoute path="/wishlist" component={WishlistPage} />
              <PrivateRoute path="/profile" component={ProfilePage} />
              <PrivateRoute path="/cart" component={CartPage} />
              <Route path="/tv" component={TVPage} />
              <Route path="/mobile" component={MobilesPage} />
              <Route path="/laptop" component={LaptopsPage} />
              <Route path="/watch" component={WatchPage} />
              <Route path="/product/:id" component={ProductPage} />
              <Route path="/search" component={SearchPage} />
              <Route path="/signin" component={SignInPage} />
              <Route path="/signup" component={SignUpPage} />
            </div>
          </ScrollToTop>
        </Switch>
      </div>
    </>
  );
}

export default App;
