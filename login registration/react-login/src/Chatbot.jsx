import React from 'react';
import './style.css'; // Ensure the CSS is correctly linked
import { useState } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the chatbot visibility
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Chatbot toggle button */}
      <button className="chatbot-toggler" onClick={toggleChatbot}>
        <span className="material-symbols-rounded">mode_comment</span>
        <span className="material-symbols-outlined">close</span>
      </button>

      {/* Chatbot container */}
      {isOpen && (
        <div className="chatbot">
          <header>
            <h2>Chatbot</h2>
            <span className="close-btn material-symbols-outlined" onClick={toggleChatbot}>
              close
            </span>
          </header>

          {/* Chatbox messages */}
          <ul className="chatbox">
            <li className="chat incoming">
              <span className="material-symbols-outlined">smart_toy</span>
              <p>
                Hi there <br />
                How can I help you today?
              </p>
            </li>
          </ul>

          {/* Chat input area */}
          <div className="chat-input">
            <textarea placeholder="Enter a message..." spellCheck="false" required></textarea>
            <span id="send-btn" className="material-symbols-rounded">
              send
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
