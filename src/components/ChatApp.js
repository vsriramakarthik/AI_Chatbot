import React, { useState } from "react";
import axios from "axios";
import "../App.css";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const userMessage = { sender: "user", text: userInput };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/chat/", {
        user_input: userInput,
      });
      const botMessage = { sender: "bot", text: response.data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { sender: "bot", text: "Error: Unable to fetch response." };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setUserInput("");
  };

//   return (
//     <div className="chat-container">
//       <div className="chat-window">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`chat-message ${msg.sender === "user" ? "user" : "bot"}`}
//           >
//             {msg.text}
//           </div>
//         ))}
//       </div>
//       <div className="chat-input">
//         <input
//           type="text"
//           value={userInput}
//           onChange={(e) => setUserInput(e.target.value)}
//           placeholder="Type your message..."
//         />
//         <button onClick={handleSend}>Send</button>
//       </div>
//     </div>
//   );
// };
// return (
//   <div className="chat-container">
//      <h1 className="chat-heading">Welcome to Your Chatbot</h1>

//     {/* Parent container for chat window and side content */}
//     <div className="chat-layout">
//       {/* Chat window */}
//       <div className="chat-window">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`chat-message ${msg.sender === "user" ? "user" : "bot"}`}
//           >
//             {msg.text}
//           </div>
//         ))}
//       </div>

//       {/* Side content: Image and Text */}
//       <div className="chat-side-content">
//         <img
//           src="https://png.pngtree.com/png-clipart/20230401/original/pngtree-smart-chatbot-cartoon-clipart-png-image_9015126.png"
//           alt="Placeholder"
//           className="side-image"
//         />
//         <p className="side-text">
//           Welcome to the chat!
//         </p>
//       </div>
//     </div>

//     {/* Chat input */}
//     <div className="chat-input">
//       <input
//         type="text"
//         value={userInput}
//         onChange={(e) => setUserInput(e.target.value)}
//         placeholder="Type your message..."
//       />
//       <button onClick={handleSend}>Send</button>
//     </div>
//   </div>
// );
// };
return (
  <div className="chat-container">
    {/* Page Heading */}
    <h1 className="chat-heading">AI Chat Assistant</h1>

    {/* Chatbox Layout */}
    <div className="chat-box">
      {/* Chat Window */}
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender === "user" ? "user" : "bot"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="chat-input">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>
          <span>Send</span>
        </button>
      </div>
    </div>

    {/* Side Content */}
    <div className="chat-side-content">
      <img
        src="https://png.pngtree.com/png-clipart/20230401/original/pngtree-smart-chatbot-cartoon-clipart-png-image_9015126.png"
        alt="Chat Assistant"
        className="side-image"
      />
      <p className="side-text">
        Welcome! I am here to assist you. Feel free to ask anything or explore
        the chat features!
      </p>
    </div>
  </div>
);
};
export default ChatApp;
