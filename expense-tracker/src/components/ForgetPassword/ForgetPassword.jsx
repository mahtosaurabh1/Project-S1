import React, { useState } from 'react'
import './ForgetPassword.css'
function ForgetPassword() {
    const [email,setEmail]=useState();
    let handleForgetPassword=async ()=>{
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD_NFcrOTB_b8H_39a6sCEPzWU17CKQy_w',{
            method:'POST',
            body:JSON.stringify({
            "requestType":"PASSWORD_RESET",
            "email":email}),
            headers:{
             'Content-Type':'application/json'
            }
           }).then(res=>{
            console.log(res);
            alert('rest password link send to your email')
           }).catch((err)=>{
            alert(err.message);
            return;
           })
    }
  return (
    <div className='parent-forget-container'>
    <div className="forget">
         <h4>Enter the email which you registred</h4>
            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <button onClick={handleForgetPassword}>Send Link</button>
    </div>
    </div>
  )
}

export default ForgetPassword