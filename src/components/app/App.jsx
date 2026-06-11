import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "..";
import { PrivateRoute } from "../../helpers";
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
          path="/tv"
          element={
            <AppLayout>
              <TVPage />
            </AppLayout>
          }
        />
        <Route
          path="/mobile"
          element={
            <AppLayout>
              <MobilesPage />
            </AppLayout>
          }
        />
        <Route
          path="/laptop"
          element={
            <AppLayout>
              <LaptopsPage />
            </AppLayout>
          }
        />
        <Route
          path="/watch"
          element={
            <AppLayout>
              <WatchPage />
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
    </>
  );
}

export default App;
