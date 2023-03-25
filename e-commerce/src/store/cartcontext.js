import React, { createContext, useContext, useEffect, useState } from "react"
import ProductsArr from "../components/assets/productList";

let CartProduct=ProductsArr;
const CartContext =createContext();


export function CartContextProvider({children}){
    const [cart,setCart]=useState([]);
    const [products,setProducts]=useState(CartProduct);

    return (
        <CartContext.Provider value={{cart,setCart,products}}>
            {children}
        </CartContext.Provider>
    )
}

export const CartState=()=>{
    return useContext(CartContext)
}