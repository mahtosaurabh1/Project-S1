import React, { useState } from 'react';
import axios from 'axios'
import classes from './EmailCompose.module.css'
import "./../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

function EmailCompose() {

  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [body,setBody] = useState('');
  let user=localStorage.getItem('user');
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    let obj={
      seen:false,
      sender:user,
      reciver:recipient,
      subject,
      body
    }

    let responce= await axios.post('https://mail-box-d1398-default-rtdb.firebaseio.com/all-mail.json',obj);
    alert('mail sent');

  }; 

  return (
    <div className={classes.emailcompose}>
      <h1>Compose Email</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.formgroup}>
          <label htmlFor="recipient">To:</label>
          <input type="email" id="recipient" value={recipient} onChange={(event) => setRecipient(event.target.value)} required />
        </div>
        <div className={classes.formgroup}>
          <label htmlFor="subject">Subject:</label>
          <input type="text" id="subject" value={subject} onChange={(event) => setSubject(event.target.value)} required />
        </div>
        <div >
          <label htmlFor="body">Body:</label>
          <div className={classes.container}>
         <textarea name="" id="" cols="100" rows="10" onChange={(e)=>setBody(e.target.value)}></textarea>
        </div>
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default EmailCompose;
