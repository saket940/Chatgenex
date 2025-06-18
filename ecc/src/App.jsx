import React, { useState, useEffect } from "react";
import Bot from "./chatbot/bot";
import User from "./chatbot/User";
import Oldchat from "./chatbot/Oldchat";

const App = () => {
  const [chatbotsname, setChatbots] = useState("");
  const [greetingMessage, setGreetingMessage] = useState("");
  const [trainingData, setTrainingData] = useState("");
  const [trainingDatapdf, setTrainingDatapdf] = useState("");
  const [message, setMessage] = useState("hi");
  const [responsecb, setResponse] = useState("");
  const [context, setContext] = useState("");
  const [chatbotMassagesBackgroundColor, setChatbotMassagesBackgroundColor] = useState("");
  const [userMassagesBackgroundColor, setUserMassagesBackgroundColor] = useState("");
  useEffect(() => {
    const fetchObjectById = async (id) => {
      try {
        const response = await fetch(`http://localhost:5000/api/find-object/${id}`);
        const result = await response.json();

        if (response.ok) {
          
          setChatbots(result.data.chatbotName);
          setGreetingMessage(result.data.greetingMessage);
          setTrainingData(result.data.trainingData);
          setTrainingDatapdf(result.data.trainingpdfdata)
          setChatbotMassagesBackgroundColor(result.data.chatbotMassagesBackgroundColor);
          setUserMassagesBackgroundColor(result.data.userMassagesBackgroundColor);
        } else {
          alert(result.message || "Object not found.");
        }
      } catch (error) {
        console.error("Error fetching object:", error);
      }
    };

    const pathname = window.location.pathname;
    const id = pathname.length < 25 ? "67de4c32c1c7ae48eee336f0" : pathname.slice(1);
    fetchObjectById(id);
  }, []);

  useEffect(() => {
    document.title=chatbotsname
    setContext(trainingData);
  }, [trainingData]);
useEffect(()=>{
  if(chatbotMassagesBackgroundColor !== "" && userMassagesBackgroundColor !== "") {
    document.documentElement.style.setProperty('--primary-color', chatbotMassagesBackgroundColor);
    document.documentElement.style.setProperty('--user-message-bg', userMassagesBackgroundColor);
  }
}, [chatbotMassagesBackgroundColor, userMassagesBackgroundColor])
  async function sendMessage(userInput) {
    try {
      const response = await fetch("http://localhost:5000/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userMessage: userInput,
          trainingData: trainingData, // Context data
          trainingDatapdf: trainingDatapdf, // Context data
        }),
      });
  
      const result = await response.json();
      setResponse(result.botResponse);
      return result.botResponse;

    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

useEffect(()=>{

  document.getElementById("greetingMessage").innerHTML=greetingMessage
},[greetingMessage])
  useEffect(() => {
    const pathname = window.location.pathname;
    const id = "index"+pathname.length < 25 ? "index67de4c32c1c7ae48eee336f0" : "index"+pathname.slice(1);
    if(localStorage.getItem(id) ==undefined){
    
      localStorage.setItem(id,"0")
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div id="cb-container" className="chatbot-container">
      <div className="chat-header">{chatbotsname}</div>
      <div className="chat-body" id="chatBody">
        <div id="greetingMessage" className="message bot"></div>
      </div>
      <div className="chat-footer">
        {Oldchat()}
        <form onSubmit={handleSubmit}>
        <input type="text" id="userInput" placeholder="Type a message..." />
        <button
        type="submit"
          id="send"
          onClick={() => {
            const userInput = document.getElementById("userInput");
            const userMessage = userInput.value.trim();
            const pathname = window.location.pathname;
            const id = "index"+pathname.length < 25 ? "index67de4c32c1c7ae48eee336f0" : "index"+pathname.slice(1);
            const ido = pathname.length < 25 ? "67de4c32c1c7ae48eee336f0" : pathname.slice(1);
if (!userMessage) return;
localStorage.setItem(id, parseInt(localStorage.getItem(id)) + 1);

User(userMessage);
localStorage.setItem("user" + ido+localStorage.getItem(id), userMessage);

sendMessage(userMessage).then((response) => {
  Bot(response);
  localStorage.setItem("bot" +ido+ localStorage.getItem(id), response);
});

userInput.value = "";

          }}
        >
          Send
        </button></form>
      </div>
    </div>
  );
};

export default App;
