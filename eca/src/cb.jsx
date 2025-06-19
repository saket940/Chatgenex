import React, { useState } from 'react'
import Ec from "./ec"
import Cookies from 'js-cookie';
const cb = (props) => {
    const userEmail=Cookies.get("userEmail");
  const [showModal, setShowModal] = useState(false);
  const deleteChatbot = async (id) => {
    if (!id) {
      alert("Invalid Chatbot ID");
      return;
    }
  if(!confirm("delete chatbot")){
    return
  }else{
    try {
      const response = await fetch(`https://Chatgenex-backend.onrender.com/api/chatbots/${userEmail}/${id}`, {
        method: "DELETE",
      });
  
      const data = await response.json();

  
      // Refresh chatbot list

    } catch (error) {
      console.error("Error deleting chatbot:", error);
    }}
  };

  return (<div className='maincb'>
    <div className='cb'>
      <h2 className="cbname">{props.name}</h2>
      <p className="cbmes">{props.message}</p>
      <h2 className="cbname">website link-
      </h2><div className='copy'><p className="web">https://chatgenex.onrender.com/{props.id}</p><button onClick={()=>{navigator.clipboard.writeText(`https://chatgenex.onrender.com/${props.id}`)}}className="edit" id='copy'>copy</button></div>
      <div className="butcan">
      <button onClick={() => setShowModal(true)}className="edit">Edit</button>
      {showModal && <Ec id={props.id}
            name={props.name}
            message={props.message}
            data={props.data} 
            onClose={() => setShowModal(false)}
            pdf={props.pdf}
            pdfdata={props.pdfdata}
            chatbotMassagesBackground={props.chatbotMassagesBackgroundColor}
            userMassagesBackground={props.userMassagesBackgroundColor}
            />}
      <button className="delete" onClick={()=>deleteChatbot(props.id)}>Delete</button></div>
    </div></div>
  )
}

export default cb
