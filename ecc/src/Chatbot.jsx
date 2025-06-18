// src/Chatbot.js
import React, { useState, useEffect } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Load chat data from localStorage when component mounts
  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('chatMessages'));
    if (storedMessages) {
      setMessages(storedMessages);
      
    }
  }, []);

  // Function to handle user input
  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    const botMessage = { sender: 'bot', text: `You said: ${input}` };

    // Update messages array with user and bot messages
    const updatedMessages = [...messages, userMessage, botMessage];
    setMessages(updatedMessages);

    // Store the updated messages in localStorage
    localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));

    // Clear input field
    setInput('');
  };

  return (
    <div className="chatbot-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender}>
            <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
