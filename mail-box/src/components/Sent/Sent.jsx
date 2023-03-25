import React, { useEffect, useState } from 'react'
import './Sent.css'
import axios from 'axios'
function Sent() {
    const [filterMail,setFilterMail]=useState([]);

    let user=localStorage.getItem('user');

    let fetchDataFromServer = async () => {
        let responce = await axios.get(
          "https://mail-box-d1398-default-rtdb.firebaseio.com/all-mail.json"
        );
        let data = responce.data;
        let loadItem = [];
        for (let key in data) {

            if(data[key].sender == user){
          loadItem.push({
            id: key,
            sender: data[key].sender,
            reciver: data[key].reciver,
            body: data[key].body,
            subject: data[key].subject,
            seen:data[key].seen
          })
        };
        }
        setFilterMail(loadItem);
      };

      let handleDelete=async (id)=>{
        let responce = await axios.delete(
          `https://mail-box-d1398-default-rtdb.firebaseio.com/all-mail/${id}.json`
        );
          fetchDataFromServer();
      }

      useEffect(()=>{
        fetchDataFromServer();
      },[])
  return (
    <div className="sent-container">
      <h2>Sended Mail</h2>
        {filterMail.map((val,i) => {
        return (
          <div className="one-sent-container">
            <div className="sub-body">
              <h3>subject-{val.subject}</h3>
              <p>{val.body}</p>
            </div>
            <div className="sender">
              <h3>sender- <span>{val.sender}</span></h3>
              <button onClick={()=>handleDelete(val.id)}>Delete</button>
            </div>
          </div>
        );
        })}
    </div>
  )
}

export default Sent