import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartState } from "../../store/cartcontext";
import "./preview.css";
function Preview() {
  let param = useParams();
  let { products, cart, setCart } = CartState();
  let user=localStorage.getItem('user');

  let singlePrdct = products.filter((val) =>{
    return val.id == param.id;
  });

  let handleAddtoCart=async (val)=>{

    let flag=false

    for(let i=0;i<cart.length;i++){
      if(cart[i].title == val.title){
        flag=true;
        break;
      }

    }
    
    if(flag){
      alert('item already added');
      return;
    }else{
          setCart([...cart,val]);
        // send data to firebase
        const response = await fetch('https://e-commerce-25ae3-default-rtdb.firebaseio.com/cart-item.json', {
            method: 'POST',
            body: JSON.stringify({...val,user},),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const data = await response.json();
          // console.log(data);

        }
      }


  return (
    <div className="preview-container">
      <img src={singlePrdct[0].imageUrl} alt="" />

       <div className="action">
       <p >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam,
          facere sed. Amet, perspiciatis! Sequi, nemo officiis. Non dolore
          placeat, doloribus accusantium nisi repellat aut! Saepe dolorem iusto
          voluptatibus quam accusamus?
        </p>
       <h3>{singlePrdct[0].title}</h3>
        <h4>${singlePrdct[0].price}</h4>
        <button onClick={()=>handleAddtoCart(singlePrdct[0])}>Add to Cart</button>
       </div>

    </div>
  );
}

export default Preview;
