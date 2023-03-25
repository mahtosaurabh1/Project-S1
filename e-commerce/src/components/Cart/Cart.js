import React, { useCallback, useEffect, useState } from 'react'
import { CartState } from '../../store/cartcontext';
import './cart.css'
function Cart() {
  let [totalAmt,setTotalAmt]=useState(0);
  let [loadedCart,loadedSetCart]=useState([]);
  let [filterCart,setfilterCart]=useState([]);
  let loginUser=localStorage.getItem('user');
  let {setCart,cart}=CartState();

  const  fetchCartHandler = useCallback(async ()=>{
    try {
      let responce=await fetch('https://e-commerce-25ae3-default-rtdb.firebaseio.com/cart-item.json');
      let  data=await responce.json();
      // console.log(data);
      let loadCartItem=[];
      for(let key in data){
        loadCartItem.push({
          id:key,
          title:data[key].title,
          price:data[key].price,
          imageUrl:data[key].imageUrl,
          user:data[key].user
        });
    }
    loadedSetCart(loadCartItem);
      

      let filterArr=loadCartItem.filter((val)=>{
        return val.user === loginUser ;
      })
      // console.log(filterArr);
      
      setfilterCart(filterArr);
      setCart(filterArr);
      setTotalAmt(filterArr.reduce((prev,cur)=>{
        return prev + Number(cur.price);
        },0))
    } catch (error) {
      console.log(error);
    }

  },[cart])

  useEffect(()=>{
    fetchCartHandler();
  },[filterCart]);

let handleRemoveFromCart=async (id)=>{
  // let nArrProducts=loadedCart.filter((val)=>{
  //   return val.id !== id;
  // })
  // setCart(nArrProducts)

  const response = await fetch(`https://e-commerce-25ae3-default-rtdb.firebaseio.com/cart-item/${id}.json`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });
   }
  return (
    <div className="cart-container">
      <table>
        <h3>Total Price ${totalAmt}</h3>
        <thead>
        <tr>
            <th><h2>Item</h2></th>
            <th><h2>Price</h2></th>
            <th><h2>Quantity</h2></th>
          </tr>
        </thead>
         {
          filterCart.map((val,i)=>{
            return(
             <tbody key={i}>
               <tr >
              <td>
                <div className="title">
                  <img src={val.imageUrl} alt="" />
                  <p>{val.title}</p>
                </div>
              </td>
              <td>${val.price}</td>
              <td className='input-btn-container'>
                <input type="text" value="1"/>
                <button onClick={()=>handleRemoveFromCart(val.id)}>Remove</button>
              </td>
            </tr>
             </tbody>
            )
          })
         }
      </table>
    </div>
  )
}

export default Cart