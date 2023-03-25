import "./App.css";
import React, { useContext } from "react";
import Header from "./components/Header/Header";
import Products from "./components/UI/Products";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import About from "./components/About/About";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Contact from "./components/contactus/Contact";
import Preview from "./components/Preview/Preview";
import { AuthContextProvider } from "./store/authcontext";
import Signup from "./components/Auth/Signup/Signup";
import Login from "./components/Auth/Login/Login";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/product" element={ <Products/>} />
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contactus" element={<Contact />} />
          <Route path="/preview/:id" element={<Preview />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </Router>
    </AuthContextProvider>
  );
}

export default App;
