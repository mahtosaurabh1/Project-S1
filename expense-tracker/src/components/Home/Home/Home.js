import React from 'react'
import './home.css'
function Home() {

  let arr= [1,2,3,4,5];
  return (
    <div>
      <div className='head'>
        <h1>get your latest album</h1>
        <i className="fa fa-eercast" style={{fontSize:"48px",color:"red"}}></i>
      </div>
      <div className='list-item-container'>
        {
         arr.map((val,i)=>{
          return(
            <div key={i} className='list-item'>
              <span>{i+10} July</span>
              <span>DTE ENERGY MUSIC THEATRE</span>
              <button className='btn'>Ticket</button>
            <br />
            </div>
          )
         })
        }
      </div>
    </div>
  )
}

export default Home