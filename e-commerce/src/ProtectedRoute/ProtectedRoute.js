import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function ProtectedRoute(props) {
    const {Component} =props;
    let navigate=useNavigate();

    useEffect(()=>{
        let user=localStorage.getItem('user');
        if(!user){
            navigate('/login')
        }
    },[])

  return (
    <Component/>
  )
}

export default ProtectedRoute