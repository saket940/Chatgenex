import React, { useState } from "react";

import Cookies from "js-cookie";

import * as pdfjs from "pdfjs-dist/build/pdf";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const CreateChatbot = ({ onClose }) => {
  const [userEmail, setUserEmail] = useState(Cookies.get("userEmail")); // Add user email input
  const [chatbotName, setChatbotName] = useState("");
  const [greetingMessage, setGreetingMessage] = useState("Hello! How can I help you today?");
  const [trainingData, setTrainingData] = useState("");
    const [trainingpdf, setTrainingpdf] = useState("");
  const [trainingpdfdata, setTrainingpdfdata] = useState("");
  const [userMassagesBackgroundColor, setUserMassagesBackgroundColor] = useState("#d2e5f5");
  const [chatbotMassagesBackgroundColor, setChatbotMassagesBackgroundColor] = useState("#000000");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userEmail) {
      alert("User email is required!");
      return;
    }

    const chatbotData = { userEmail, chatbotName, greetingMessage, trainingData,trainingpdf,trainingpdfdata,chatbotMassagesBackgroundColor,userMassagesBackgroundColor };

    try {
      const response = await fetch("https://Chatgenex-backend.onrender.com/api/chatbots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(chatbotData),
      });

      const result = await response.json();
      console.log(result.message);

      onClose();

    } catch (error) {
      console.error("Error saving chatbot:", error);
      alert("Failed to save chatbot!");
    }
  };

  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile)
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        setError("Please upload a valid PDF file.");
        event.target.value = "";

      } else if (selectedFile.size > 5 * 1024 * 1024) {
        setError("File size should be less than 5MB.");
        event.target.value = "";
      } else {
        setError("");
        setTrainingpdf(event.target.value)
        extractTextFromPDF(selectedFile);
      }
    }
  };

  const extractTextFromPDF = async (file) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = async () => {
      const arrayBuffer = reader.result;
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      let extractedText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const text = textContent.items.map((item) => item.str).join(" ");
        extractedText += text + "\n";
      }

      setTrainingpdfdata(extractedText);
    };
  };
  return (
    <div className="chatbot-modal-overlay">
      <div className="chatbot-modal">
        <h2 className="chatbot-modal-title">Create New Chatbot</h2>
        <form className="chatbot-form" onSubmit={handleSubmit}>
          <label className="chatbot-label">Chatbot Name</label>
          <input
            type="text"
            className="chatbot-input"
            value={chatbotName}
            onChange={(e) => setChatbotName(e.target.value)}
            required
          />

          <label className="chatbot-label">Greeting Message</label>
          <input
            type="text"
            className="chatbot-input"
            value={greetingMessage}
            onChange={(e) => setGreetingMessage(e.target.value)}
          />
<label className="chatbot-label">Upload PDF (Max: 5MB)-optional</label>
          {error && <p className="red">{error}</p>}
          <input
            type="file"
            accept="application/pdf"
            value={trainingpdf}
            onChange={handleFileChange}
            className="border p-2 rounded w-full"
          />
          <label className="chatbot-label">Data</label>
          <textarea
            className="chatbot-textarea"
            value={trainingData}
            onChange={(e) => setTrainingData(e.target.value)}
          />
          <label className="chatbot-label">Chatbot massages background color</label>
          <input
            type="color"
            style={{ width: "90%", height: "20px" }}
            value={chatbotMassagesBackgroundColor}
            onChange={(e) => setChatbotMassagesBackgroundColor(e.target.value)}
            required
          /><label className="chatbot-label">user massages background color</label>
          <input
            type="color"
            style={{ width: "90%", height: "20px" }}
            value={userMassagesBackgroundColor}
            onChange={(e) => setUserMassagesBackgroundColor(e.target.value)}
            required
          />
          <button type="submit" id="chatbot-submit-btn">
            Create Chatbot
          </button>
        </form>
        <button id="chatbot-close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CreateChatbot;
