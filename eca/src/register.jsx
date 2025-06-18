import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react";
import Cookies from "js-cookie";

const register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://Chatgenex-backend.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
     if (response.ok) {
             Cookies.set("userEmail", email);
             navigate("/");
           } else {
             alert(data.message);
           }
    } catch (error) {
      alert("Error:", error);
    }
  };


  return (
    <div>
        <div className="fram">
            <div id="ffc"className="fc">
                <div id='ff'><h3>Welcome to chat bot creator</h3>
                    <div>
                        <Link to="/login"><button>Login</button></Link>
                        <Link to="/register"><button>Register</button></Link>
                    </div>
                    <div >
                    <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
                    </div>
                </div>
            </div>
            <div id="sfc"className="fc">
                <h1>Create Custom Chatbots</h1>
                <p>Build intlligent chatbot powered by OpenAi without writing any cood</p>
            </div>
        </div>
    </div>
  )
}

export default register
