import React, { useState } from 'react'

let AuthContext=React.createContext({
    token:'',
    isLoggedIn:false,
    logout:()=>{},
    login:(token)=>{}
})


export let AuthContextProvider=(props)=>{
    let initialToken=localStorage.getItem('token')
    let [token,setToken]=useState(initialToken);
    let  userIsLoggedIn= !!token;

    let loginHandler=(token)=>{
        localStorage.setItem('token',token)
        setToken(token)
    }

    let logoutHandler=()=>{
        setToken(null)
        localStorage.removeItem('token')
        localStorage.removeItem('user');
       
    }

    const contextValue={
        token:token,
        isLoggedIn:userIsLoggedIn,
        login:loginHandler,
        logout:logoutHandler
    }
     return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext