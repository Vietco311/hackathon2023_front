import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import logoChat from './logoChat.svg';

function App() {
  const [input, setInput] = useState('');
  const [viewVisible, setViewVisible] = useState(false);
  const [messages, setMessages] = useState([]);

  const chatWithBot = async (userInput) => {
    console.log(userInput)
      const apiEndpoint = 'https://hackathon-2023-api.carlotti-toussaint.com/api/chat';

      const data = {
        message:userInput
      };
  try {
        const response = await axios.post(apiEndpoint, data, { withCredentials: true });
        console.log(response.data)
        console.log(messages)
        return response.data.conversation[1].content;
      } catch (error) {
        console.error('Error communicating with the API:', error);
        return '';
      }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { text: input, user: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    const aiMessage = { text: '...', user: false };
    setMessages((prevMessages) => [...prevMessages, aiMessage]);
    const response = await chatWithBot(input);
    const newAiMessage = { text: response, user: false };
    setMessages((prevMessages) => [...prevMessages.slice(0, -1), newAiMessage]);
    setInput('');
  }

    const toggleView = () => {
      setViewVisible(!viewVisible);
    };

    return (
      
      
      <div className="container">
      <div className="row">
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <div className="card-title">Chat</div>
              <hr />
            </div>
            {viewVisible && (
              <div id="view" className="visible">
                <div className="messages">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`message ${msg.user  ? 'user-message' : 'ai-message'}`}
                    >
                      {msg.text}
                    </div>
                  ))}
                </div>
                <div className="card-footer">
                  <form onSubmit={handleSubmit}>
                    <input
                      id="text"
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Rentrez votre message..."
                      className="form-control"
                    />
                    <button type="submit">Envoyer</button>
                  </form>
                </div>
              </div>
            )}
            <div className="chat-button-container">
              <button className="chat-button" onClick={toggleView}>
                <img src={logoChat} alt="Chat logo" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
