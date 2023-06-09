import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../store/authcontext";
import { CartState } from "../../store/cartcontext";
import "./header.css";

function Header() {
  let { cart, setCart } = CartState();
  let navigate = useNavigate();
  let authCtx = useContext(AuthContext);
  let isLogin = authCtx.isLoggedIn;
  let loginUser = localStorage.getItem("user");

  let logOutHandler = () => {
    authCtx.logout();
    navigate("/login");
  };

  async function fetchCartData() {
    let cartItem = await fetch(
      "https://e-commerce-25ae3-default-rtdb.firebaseio.com/cart-item.json"
    );
    let data = await cartItem.json();
    // console.log(data);

    let loadCartItem = [];
    for (let key in data) {
      if (loginUser == data[key].user) {
        loadCartItem.push({
          id: key,
          title: data[key].title,
          price: data[key].price,
          imageUrl: data[key].imageUrl,
          user: data[key].user,
        });
      }
    }
    console.log("a");
    setCart(loadCartItem);
  }
  useEffect(() => {
    console.log("a");
    fetchCartData();
  }, [isLogin]);

  return (
    <div className="header">
      <div className="product-header-container">
        <NavLink to="/" className="link">
          Home
        </NavLink>

        <NavLink to="/about" className="link">
          About
        </NavLink>
        <NavLink to="/contactus" className="link">
          Contact-Us
        </NavLink>
        {isLogin && (
          <>
            <NavLink to="/product" className="link">
              Store
            </NavLink>
            <NavLink to="/cart" className="link">
              <div>Cart {cart.length}</div>
            </NavLink>
          </>
        )}
      </div>

      <div className="auth-container">
        {!isLogin && (
          <>
            <NavLink to="/login" className="link">
              <div>Login</div>
            </NavLink>
            <NavLink to="/signup" className="link">
              Sign-Up
            </NavLink>
          </>
        )}
        {isLogin && (
          <div className="link" onClick={logOutHandler}>
            Logout
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
