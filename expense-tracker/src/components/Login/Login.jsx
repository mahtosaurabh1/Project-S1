import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import "./login.css";
function Login() {
  let authCtx = useContext(AuthContext);
  const [loading, setIsLoading] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  let navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD_NFcrOTB_b8H_39a6sCEPzWU17CKQy_w",
      {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          localStorage.setItem("user", email);
          return res.json();
        } else {
          return res.json().then((data) => {
            // console.log(data);
            let errorMessage = "Authencation failed...";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        // console.log(data);
        authCtx.login(data.idToken);
        navigate("/expenses");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <div className="email">
        <div>Email</div>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="password">
        <div>Password</div>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      
      <div className="actions">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <button onClick={loginHandler}>Login</button>
      )}

      <button><Link className="Link" to="/forget-password">Forget Password</Link></button>
      </div>
    </div>
  );
}

export default Login;
