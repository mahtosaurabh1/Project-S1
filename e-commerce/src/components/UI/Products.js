import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartState } from "../../store/cartcontext";
import "./products.css";
function Products() {
  let navigate=useNavigate();
  let {products,setCart,cart}=CartState();
  let productArr =products;
  let user=localStorage.getItem('user');

  let handleAddtoCart=async (val)=>{
    if(cart.includes(val)){
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

  let previewPageHandler=(id)=>{
    let singlePrdct=products.filter((val)=>{
      return val.id===id;
    })
    // console.log(singlePrdct);
    navigate(`/preview/${id}`);
    
  }

  return (
    <div className="product-container">
      {productArr.map((val, i) => {
        return (
          <div className="card" key={i}>
            <div className="title">{val.title}</div>
            <img onClick={()=>previewPageHandler(val.id)}
              src={val.imageUrl}
              alt=""
            />
            <div className="btn-price-container">
              <div className="price">${val.price}</div>
              <button onClick={()=>handleAddtoCart(val)} className='btn'>Add to Cart</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default Products
