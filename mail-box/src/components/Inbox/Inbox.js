import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Inbox.css";
function Inbox() {
  let [allmail, setAllmail] = useState([]);
  let user=localStorage.getItem('user')

  let fetchDataFromServer = async () => {
    let responce = await axios.get(
      "https://mail-box-d1398-default-rtdb.firebaseio.com/all-mail.json"
    );
    let data = responce.data;
    let loadItem = [];
    for (let key in data) {
     if(data[key].sender == user || data[key].reciver == user){
      loadItem.push({
        id: key,
        sender: data[key].sender,
        reciver: data[key].reciver,
        body: data[key].body,
        subject: data[key].subject,
        seen:data[key].seen
      });
     }
    }
    setAllmail(loadItem);
  };

  let handleMarkasRead=async (id,i)=>{
    let newObj={
      sender:allmail[i].sender,
      reciver:allmail[i].reciver,
      body:allmail[i].body,
      subject:allmail[i].subject,
      seen:true
    }
    let responce = await axios.put(
      `https://mail-box-d1398-default-rtdb.firebaseio.com/all-mail/${id}.json`,newObj
    );

    fetchDataFromServer();

  }

  let handleDelete=async (id)=>{
    let responce = await axios.delete(
      `https://mail-box-d1398-default-rtdb.firebaseio.com/all-mail/${id}.json`
    );
      fetchDataFromServer();
  }

  useEffect(() => {
    fetchDataFromServer();
  }, []);

  return (
    <div className="inbox-container">
      <h1>Inbox</h1>
      {allmail.map((val,i) => {
        return (
          <div className="one-inbox-container">
            <div className="sub-body">
              <h3>subject-{val.subject}</h3>
              <p>{val.body}</p>
            </div>
            <div className="sender">
              <h3>sender- <span>{val.sender}</span></h3>
              <div className="action-btn">
              <button onClick={()=>handleDelete(val.id)}>Delete</button>
              {!val.seen &&  <button onClick={()=>handleMarkasRead(val.id,i)} >Mark Read</button>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Inbox;
