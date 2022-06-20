import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/shared/footer/Footer.component";
import Header from "./components/shared/header/Header.component";
import HomePage from "./pages/home-page/HomePage.component";
import CartPage from "./pages/cart-page/CartPage.component";
import LoginPage from "./pages/login-page/LoginPage.component";
import SignupPage from "./pages/signup-page/SignupPage.component";
import PageNotFound from "./pages/page-not-found/PageNotFound.component";
import AuthContextProvider from "./contexts/Auth.context";
import BookPage from "./pages/book-page/BookPage.component";
import CartContextProvider from "./contexts/Cart.context";

const App = () => {
  return ( <BrowserRouter>
  <AuthContextProvider>
    <CartContextProvider>
      <Header/>

        <Routes>
          <Route path="" element={<HomePage/>}/>
          <Route path="/cart" element={<CartPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path={"books/:id"} element={<BookPage/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>

        <Footer/>
      </CartContextProvider> 
    </AuthContextProvider>
  </BrowserRouter>
  );
};

export default App;
