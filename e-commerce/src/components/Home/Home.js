import React from 'react'
import './home.css'
function Home() {
  let arr= Array.from(Array(5));
  return (
    <div>
      <div className='head'>
        <h1>get your latest album</h1>
        <i class="fa fa-eercast" style={{fontSize:"48px",color:"red"}}></i>
      </div>
      <div className='list-item-container'>
        {
         arr.map((val,i)=>{
          return(
            <>
            <div key={i} className='list-item'>
              <span>{i+5} July</span>
              <span>DTE ENERGY MUSIC THEATRE</span>
              <button className='btn'>Buy Tickets</button>
            </div>
            <br />
            </>
          )
         })
        }
      </div>
    </div>
  )
}

export default Home