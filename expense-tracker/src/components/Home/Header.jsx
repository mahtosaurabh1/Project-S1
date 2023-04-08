import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import "./header.css";
function Header() {
  let authCtx = useContext(AuthContext);
  let navigate = useNavigate();
  let user = localStorage.getItem("user");
  let logoutHandler = () => {
    authCtx.logout();
    navigate("/login");
  };
  return (
    <div className="header">
     <h3> <Link to='/' className="Link">Expense tracker</Link></h3>
      <div className="header-btn">
        {user ? (
          <div className="header-btn">
            <button><Link className="Link" to="/expenses">
              Expenses
            </Link></button>
           <button> <Link to="/profile" className="Link">
              Profile
            </Link></button>
            <button onClick={logoutHandler}>Logout</button>
          </div>
        ) : (
          <div className="header-btn">
           <button> <Link className="Link" to="/login">Login</Link></button>
           <button> <Link className="Link" to="/singup">
              Singup
            </Link></button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
