import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../store/authcontext";
import { CartState } from "../../store/cartcontext";
import "./header.css";

function Header() {
  let { cart } = CartState();
  let navigate=useNavigate();
  let authCtx=useContext(AuthContext);
  let isLogin=authCtx.isLoggedIn;

  let logOutHandler=()=>{
    authCtx.logout();
    navigate('/login')
  }
  return (
    <div className="header">
        <NavLink to="/" className='link'>
          Home
        </NavLink>
        
        <NavLink to="/about" className='link' >
          About
        </NavLink>
        <NavLink to="/contactus" className='link'>
          Contact-Us
        </NavLink>
        {isLogin && <>
          <NavLink to="/product" className='link' >
          Store
        </NavLink>
        <NavLink to="/cart" className='link'>
            <div>Cart {cart.length}</div>
          </NavLink>
        </>}

          {!isLogin && <><NavLink to='/login' className='link'><div>Login</div></NavLink>
            <NavLink to='/signup' className='link' >Create Acount</NavLink></>}
            {isLogin && <div className="link" onClick={logOutHandler}>Logout</div>}

        
    </div>
  );
}

export default Header;
