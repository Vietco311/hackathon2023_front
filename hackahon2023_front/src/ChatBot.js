import logoChat from './logoChat.svg';
import botImg from './botImg.svg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ChatBot() {
    const [input, setInput] = useState('');
    const [viewVisible, setViewVisible] = useState(false);
    const [messages, setMessages] = useState([]);

    const chatWithBot = async (userInput) => {
        console.log(userInput)
        const apiEndpoint = 'https://hackathon-2023-api.carlotti-toussaint.com/api/chat';

        const data = {
            message: userInput
        };
        try {
            const response = await axios.post(apiEndpoint, data, { withCredentials: true });

            return response.data.conversation;
        } catch (error) {
            console.error('Error communicating with the API:', error);
            return '';
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        const newMessagesList = await chatWithBot(input)
        setMessages(messagesList => [...messagesList, newMessagesList]);
        console.log(messages)
        setInput('');
    }

    const arrangeMessages = (messages) => {
        let arrangedMessages = [];

        messages.forEach((msg) => {
            console.log(msg)
            if (Array.isArray(msg)) {
                arrangedMessages = arrangedMessages.concat(msg);
            } else {
                arrangedMessages.push(msg);
            }
        });

        return arrangedMessages;
    };


    const toggleView = () => {
        setViewVisible(!viewVisible);
    };
    return (
        <>
            <div id="view" className={viewVisible ? '' : 'hidden'}>
                <div id='chat_header'>
                    <h2 id="chat_title">Votre IA</h2>
                    <button id="close_button" onClick={toggleView}>
                        <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                            <path d="M0 0h24v24H0z" fill="none"></path>
                        </svg>
                    </button>
                </div>
                <div className="chatbox">
                    {arrangeMessages(messages).map((msg, index) => (
                        <div key={index} className={`${msg.role === 'user' ? 'user-container' : 'ai-container'}`}>
                            <div className={`${msg.role === 'user' ? 'user-image' : 'ai-image'}`}>
                                {msg.role !== 'user' &&
                                    <img className="imgBot" src={botImg} alt="avatar" />
                                }
                            </div>
                            <div
                                className={`message ${msg.role === 'user' ? 'user-message' : 'ai-message'}`}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}
                </div>
                <div id="chat_footer">
                    <form id="chat_form" onSubmit={handleSubmit}>
                        <input
                            id="text"
                            type="textarea"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Rentrez votre message..."
                            className="form-control"
                        />
                        <button id="submit_button" type="submit" >
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 500 500"><g><g><polygon points="0,497.25 535.5,267.75 0,38.25 0,216.75 382.5,267.75 0,318.75"></polygon></g></g></svg>
                        </button>
                    </form>
                </div>
            </div>
            <div className="chat-button-container">
                <button id='chat_button' className={viewVisible ? 'hidden' : ''} onClick={toggleView}>
                    <img style={{ width: '100%' }} src={logoChat} alt="Chat logo" />
                </button>
            </div>
        </>
    );
}

export default ChatBot;


