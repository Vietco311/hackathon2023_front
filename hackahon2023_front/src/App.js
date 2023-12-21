import React, { useState } from 'react';
import './App.css';
import ChatBot from 'react-simple-chatbot';

function App() {
  const [messages, setMessages] = useState([]);
  const [viewVisible, setViewVisible] = useState(false);

  function setNewMessage(msg) {
      setMessages([
        ...messages,
        msg
      ]);
    }

    function sendMessage(e) {
      e.preventDefault();
      const msg = {
        text: e.target.text.value
      };
      setNewMessage(msg);
      e.target.text.value = '';
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
              </div>
              {viewVisible && (
                <div id="view" className="visible">
                  <form onSubmit={e => sendMessage(e)}>
                  <div className="messages">
                {messages.map((msg, index) => {
                  return <div key={index}>{msg.text}</div>;
                })}
                </div>
                  <div className="card-footer">
                    
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
              <div class="chat-button-container">
                <button className="chat-button" onClick={toggleView}><img src="/src/logoChat.svg" alt="Chat logo" /> </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;