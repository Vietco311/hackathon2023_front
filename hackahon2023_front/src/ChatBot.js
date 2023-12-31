import logoChat from './logoChat.svg';
import botImg from './botImg.svg';
import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';

axios.defaults.timeout = 0;

function ChatBot() {
    const [input, setInput] = useState('');
    const [viewVisible, setViewVisible] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isLoaded, setIsLoaded] = useState(true);

    const ref = useRef(null);

    useEffect(() => {
        if (messages.length) {
            ref.current?.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        }
    }, [messages.length]);

    useEffect(() => {
        const getConversation = async () => {
            const apiEndpoint = 'https://hackathon-2023-api.carlotti-toussaint.com/api/chat';

            try {
                const response = await axios.get(apiEndpoint, {withCredentials: true});
                console.log(response.data)
                setMessages(response.data.conversation || []);
            } catch (error) {
                console.error('Error communicating with the API:', error);
            }
        };
        getConversation();
    }, []);

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
        if (input !== '') {
            setIsLoaded(false);
            const message = input
            setInput('');
            setMessages([...messages, {content: message, role: 'user'}])
            if (!input.trim()) return;
            const messagesList = await chatWithBot(message)
            setMessages(messagesList);
            setIsLoaded(true);
        };
    }

    const toggleView = () => {
        setViewVisible(!viewVisible);
    };

    const resetChat = () => {
        axios.get('https://hackathon-2023-api.carlotti-toussaint.com/api/chat/reset', {withCredentials: true}).then((response) => {
            setMessages(response.data.conversation || []);
        });
    }

    return (
        <>
            <div className={`view ${viewVisible ? '' : 'hidden'}`}>
                <div className='chat_header'>
                    <img src={botImg} className='botImg'></img>
                    <h2 className="chat_title">Votre IA</h2>
                    <button className="close_button" onClick={toggleView}>
                        <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                            <path d="M0 0h24v24H0z" fill="none"></path>
                        </svg>
                    </button>
                </div>
                <div className="messages">
                    {messages.map((msg, index) => (
                        <div key={index}
                            className={`message ${msg.role === 'user' ? 'user-message' : 'ai-message'}`}>
                            {msg.content}
                        </div>
                    ))}
                    <div ref={ref} />
                </div>
                <div className="chat_footer">
                    <form className="chat_form" onSubmit={handleSubmit}>
                        <input
                            className="text"
                            type="textarea"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Rentrez votre message..."
                        />
                        <button className="reset-button" type="button" onClick={resetChat}>
                            <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                                <path d="M0 0h24v24H0z" fill="none"></path>
                            </svg>
                        </button>
                        {isLoaded ? (
                            <button className="submit-button" type="submit">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                    viewBox="0 0 500 500">
                                    <g>
                                        <g>
                                            <polygon
                                                points="0,497.25 535.5,267.75 0,38.25 0,216.75 382.5,267.75 0,318.75"></polygon>
                                        </g>
                                    </g>
                                </svg>
                            </button>
                        ) : (
                            <div className="loader-container">
                                <div className="loader"></div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
            <div className="chat-button-container">
                <button className={ `chat_button ${viewVisible ? 'hidden' : ''}`} onClick={toggleView}>
                    <img style={{ width: '100%' }} src={logoChat} alt="Chat logo" />
                </button>
            </div>
        </>
    );
}

export default ChatBot;


