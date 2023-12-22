import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

import ChatBot from './ChatBot';


function App() {
    const [input, setInput] = useState('');
    const [viewVisible, setViewVisible] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isLoaded, setIsLoaded] = useState(true);

    const chatWithBot = async (userInput) => {
        console.log(userInput)
        const apiEndpoint = 'https://hackathon-2023-api.carlotti-toussaint.com/api/chat';

        const data = {
            message: userInput
        };
        try {
            const response = await axios.post(apiEndpoint, data, {withCredentials: true});
            console.log(response.data)
            console.log(messages)
            return response.data.conversation;
        } catch (error) {
            console.error('Error communicating with the API:', error);
            return '';
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoaded(false);
        const message = input
        setInput('');
        setMessages([...messages, {content: message, role: 'user'}])
        if (!input.trim()) return;
        const messagesList = await chatWithBot(message)
        setMessages(messagesList);
        setIsLoaded(true);
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
                        <ChatBot/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
