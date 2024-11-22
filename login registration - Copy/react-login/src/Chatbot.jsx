import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

const API_KEY = "AIzaSyCOK9-BFR_jKeJLbJ2wX-9GU6zTkHsYT6o";
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'incoming',
      message: {
        title: 'Welcome',
        question: '',
        answer: ['Hi there! How can I help you today?'],
      },
    },
  ]);

  const chatboxRef = useRef(null);

  const createChatMessage = (message, className) => ({
    type: className,
    message,
  });

  const formatResponseAsPoints = (text) => {
    // Split response text into bullet points
    const points = text
      .split(/(?:\n|-|\•)+/) // Split by new lines or bullet characters
      .map((point) => point.trim()) // Remove extra spaces
      .filter((point) => point); // Exclude empty strings
    return points;
  };

  const generateResponse = async (question) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: question }] }],
      }),
    };

    try {
      const response = await fetch(API_URL, requestOptions);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message);

      // Process response into structured points
      const rawAnswer = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, '$1');
      const points = formatResponseAsPoints(rawAnswer);

      return {
        title: 'Response',
        question,
        answer: points,
      };
    } catch (error) {
      return {
        title: 'Error',
        question,
        answer: [`Error: ${error.message}`],
      };
    }
  };

  const handleChat = async () => {
    if (!userMessage.trim()) return;

    // Append user's question
    setChatHistory((prev) => [
      ...prev,
      createChatMessage(
        { title: 'User Query', question: userMessage, answer: [] },
        'outgoing'
      ),
    ]);

    setUserMessage('');

    // Generate and append response
    const responseMessage = await generateResponse(userMessage);
    setChatHistory((prev) => [...prev, createChatMessage(responseMessage, 'incoming')]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleChat();
    }
  };

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="chatbot">
      <header>
        <h2>Chatbot</h2>
        <span
          className="close-btn"
          onClick={() => document.body.classList.remove('show-chatbot')}
        >
          ✖
        </span>
      </header>
      <ul className="chatbox" ref={chatboxRef}>
        {chatHistory.map((chat, index) => (
          <li key={index} className={`chat ${chat.type}`}>
            <p><strong>{chat.message.title}</strong></p>
            {chat.message.question && <p>Q: {chat.message.question}</p>}
            <p>
              A:
              <ul>
                {chat.message.answer.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </p>
          </li>
        ))}
      </ul>
      <div className="chat-input">
        <textarea
          placeholder="Enter your message..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck="false"
        />
        <button onClick={handleChat}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
