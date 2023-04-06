import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./Header.module.css";

export const Header = () => {
  let authCtx = useContext(AuthContext);
  let navigate = useNavigate();
  let user = localStorage.getItem("user");
  let logoutHandler = () => {
    navigate("/login");
    authCtx.logout();
  };
  return (
    <header className={classes.sticky}>
      <nav className={classes.navbar}>
        <h1 className={classes.navbar__title}>
          <NavLink
            to="/"
            className={classes.navbar__link}
            activeclassname={classes.active}
          >
            MailBox
          </NavLink>
        </h1>
        <ul className={classes.navbar__list}>
          {!user && (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={classes.navbar__link}
                  activeclassname={classes.active}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/singup"
                  className={classes.navbar__link}
                  activeclassname={classes.active}
                >
                  Singup
                </NavLink>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <NavLink
                  to="/"
                  className={classes.navbar__link}
                  activeclassname={classes.active}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/email-compose"
                  className={classes.navbar__link}
                  activeclassname={classes.active}
                >
                  compose
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/inbox"
                  className={classes.navbar__link}
                  activeclassname={classes.active}
                >
                  Inbox
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/sent"
                  className={classes.navbar__link}
                  activeclassname={classes.active}
                >
                  Sent
                </NavLink>
              </li>
              <li>
                <div className="logout-cont">
                  <div onClick={logoutHandler} className={classes.logout_btn}>
                    Logout
                  </div>
                </div>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
