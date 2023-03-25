import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartState } from "../../store/cartcontext";
import "./preview.css";
function Preview() {
  let param = useParams();
  let { products, cart, setCart } = CartState();

  let singlePrdct = products.filter((val) => {
    // console.log(typeof(param.id),typeof(val.id));
    return val.id == param.id;
  });

  let handleAddtoCart=(val)=>{
    if(cart.includes(val)){
      alert('item already added');
      return;
    }
    setCart([...cart,val]);
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
