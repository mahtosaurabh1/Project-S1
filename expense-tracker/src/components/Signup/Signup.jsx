import React, {  useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import './signup.css'
function Signup() {
    const [isLoading,setIsLoading]=useState(false);
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [confPassword,setconfPassword]=useState();
    let authCtx=useContext(AuthContext);
    let navigate=useNavigate();

    const signupHandler=(e)=>{
        e.preventDefault();
        setIsLoading(true)
        
        if(password === confPassword){
            fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD_NFcrOTB_b8H_39a6sCEPzWU17CKQy_w',{
          method:'POST',
          body:JSON.stringify({
           email,password,
           returnSecureToken:true
          }),
          headers:{
           'Content-Type':'application/json'
          }
         }).then(res=>{
           setIsLoading(false)
           if(res.ok){
            localStorage.setItem('user',email);

              return res.json();
           }else{
           return res.json().then(data=>{
             // console.log(data);
             let errorMessage='Authencation failed...'
             if(data && data.error && data.error.message){
              errorMessage=data.error.message;
             }
             throw new Error(errorMessage)
            }) 
           }
         }).then((data)=>{
          authCtx.login(data.idToken);
          navigate('/expenses')
         }).catch((err)=>{
          alert(err.message)
         })
        }else{
            alert('Password mismatched');
            setIsLoading(false)
        }
        
       }

  return (
    <div className="parent-sing-up-container">
    <div className="singup">
        <h1>Create-One</h1>
        <div className="email">
            <div>Email</div>
            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="password">
            <div>Password</div>
            <input type="text" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <div className="confirm-password">
            <div>Confirm-Password</div>
            <input type="text" value={confPassword} onChange={e=>setconfPassword(e.target.value)} />
        </div>
        {isLoading && <p>loading...</p>}
        {!isLoading && <button onClick={signupHandler}>Sing-Up</button>}

    </div>
    
 </div>
  )
}

export default Signup