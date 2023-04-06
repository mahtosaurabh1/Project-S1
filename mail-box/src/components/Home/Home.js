import React from 'react'
import './home.css'
function Home() {

  let arr= [1,2,3,4,5];
  return (
    <div className='parent-header'>
      <div className='head'>
        <h1>Welcome</h1>
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