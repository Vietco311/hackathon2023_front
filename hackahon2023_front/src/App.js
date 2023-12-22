import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import ChatBot from './ChatBot';


function App() {
    
    return (
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <div className="card">

                        <ChatBot/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
