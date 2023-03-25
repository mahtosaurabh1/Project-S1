import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../store/authcontext';
import './signup.css'
function Signup() {
    const [isLoading,setIsLoading]=useState(false);
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
 
    let authCtx=useContext(AuthContext);
    let navigate=useNavigate();

    const signupHandler=(e)=>{
        e.preventDefault();
        setIsLoading(true)
        
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAqAWuE9zphiTo8Om0JVvlH6NIDf9JWXwI',{
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
            authCtx.setUser(email);
            // console.log(authCtx.user);
            localStorage.setItem('user',email)
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
          navigate('/')
          
         }).catch((err)=>{
          alert(err.message)
         })
       }

  return (
    <div className="singup-cont">
      <h1>Create-Account</h1>
        <div className="email input-grp">
            <div>Email</div>
            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="password input-grp">
            <div>Password</div>
            <input type="text" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
     <div className="btn-cont">
     {isLoading && <p>loading...</p>}
        {!isLoading && <button onClick={signupHandler}>Signup</button>}
     </div>
    </div>
  )
}

export default Signup