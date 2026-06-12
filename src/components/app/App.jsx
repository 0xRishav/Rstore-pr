import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar, Footer } from "..";
import { PrivateRoute } from "../../helpers";
import {
  AllProductsPage,
  CartPage,
  Homepage,
  CategoryPage,
  SearchPage,
  SignInPage,
  WishlistPage,
  SignUpPage,
  ProfilePage,
} from "../../pages";
import ProductPage from "../product-page/ProductPage";

import "./App.css";

function AppLayout({ children }) {
  return (
    <div className="App__wrapper">
      <div className="App">{children}</div>
    </div>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/products"
          element={
            <AppLayout>
              <AllProductsPage />
            </AppLayout>
          }
        />
        <Route
          path="/wishlist"
          element={
            <AppLayout>
              <PrivateRoute>
                <WishlistPage />
              </PrivateRoute>
            </AppLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <AppLayout>
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            </AppLayout>
          }
        />
        <Route
          path="/cart"
          element={
            <AppLayout>
              <PrivateRoute>
                <CartPage />
              </PrivateRoute>
            </AppLayout>
          }
        />
        <Route
          path="/category/:category"
          element={
            <AppLayout>
              <CategoryPage />
            </AppLayout>
          }
        />
        <Route
          path="/product/:id"
          element={
            <AppLayout>
              <ProductPage />
            </AppLayout>
          }
        />
        <Route
          path="/search"
          element={
            <AppLayout>
              <SearchPage />
            </AppLayout>
          }
        />
        <Route
          path="/signin"
          element={
            <AppLayout>
              <SignInPage />
            </AppLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <AppLayout>
              <SignUpPage />
            </AppLayout>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
