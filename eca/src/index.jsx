import React, { useEffect, useState } from "react";
import CreateChatbot from "./cc";
import CB from "./cb";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
function App() {
  const [showModal, setShowModal] = useState(false);
  const navigate=useNavigate();
  const [userEmail,setuserEmail]=useState(Cookies.get("userEmail"));
  if( userEmail == undefined){
    return(<Navigate to="/login"/> );
  }
  const [chatbots, setChatbots] = useState([]);

  const fetchChatbots = async () => {
    try {
      const response = await fetch(`https://Chatgenex-backend.onrender.com/api/chatbots/${userEmail}`);
      const data = await response.json();
  
      if (response.ok) {
        
        setChatbots(data.chatbots || []); // Ensure we store an empty array if no data
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error fetching chatbots:", error);
    }
  };
  function logout() {
    Cookies.remove("userEmail")
    setuserEmail("")
  navigate("/login")
  }
  // Fetch chatbots on component mount
  useEffect(() => {
    if (userEmail) {
      fetchChatbots();
    }
  });
  return (<><div className="main">
    <div>
<h2>Chatbot Creator</h2>
<p>Welcome {userEmail}</p>
    </div>
    <div className="but">
      <button onClick={() =>{logout()}}>Logout</button>
      <button onClick={() => setShowModal(true)}>New Chatbot</button>
      {showModal && <CreateChatbot onClose={() => setShowModal(false)} />}
    </div>
  </div>

  {chatbots.length > 0 ? (
        chatbots.map((bot) => (
          <CB
            key={bot._id}
            id={bot._id}
            name={bot.chatbotName}
            message={bot.greetingMessage}
            data={bot.trainingData}
            pdf={bot.trainingpdf}
            pdfdata={bot.trainingpdfdata}
            chatbotMassagesBackgroundColor={bot.chatbotMassagesBackgroundColor}
            userMassagesBackgroundColor={bot.userMassagesBackgroundColor}
          />
        ))
      ) : (
        <p>No chatbots found. Create a new one!</p>
      )}


  </>);
}

export default App;
