import React, { useState, useEffect } from 'react';
import axios from 'axios';
import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

const chatWithBot = async (userInput) => {
    const apiEndpoint = 'https://hackathon-2023-api.carlotti-toussaint.com/api/chat';

    const data = {
      prompt: userInput,
      max_tokens: 150
    };
try {
      const response = await axios.post(apiEndpoint, data, { withCredentials: true });
      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error('Error communicating with the API:', error.message);
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
                <hr/>
                {<div className="messages">
                  {messages.map((msg,index) => {
                    return (
                        <div key={index}>{msg.role}: {msg.content}</div>
                    )
                  })}
                </div>}
              </div>
              {viewVisible && (
                <div id="view" className="visible">
                  <form onSubmit={e => handleSubmit(e)}>
                  <div className="card-footer">
                    <input id="username"
                          type="text"
                          placeholder="Nom"
                          className="form-control"
                    />
                    <br/>
                    <input id="text"
                          type="text"
                          placeholder="Votre message"
                          className="form-control"
                    />
                    <br/>
                    <button type="submit">Envoyer </button>
                  </div>
                </form>
                </div>
              )}
              <button className="chat-button" onClick={toggleView}><img src="logoChatNB.svg" alt="Chat logo" /> </button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;