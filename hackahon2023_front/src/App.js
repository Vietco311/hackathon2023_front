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
        username: e.target.username.value,
        text: e.target.text.value
      };
      setNewMessage(msg);
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
                <div className="messages">
                  {messages.map(msg => {
                    return (
                        <div>{msg.username}: {msg.text}</div>
                    )
                  })}
                </div>
              </div>
              {viewVisible && (
                <div id="view" className="visible">
                  <form onSubmit={e => sendMessage(e)}>
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