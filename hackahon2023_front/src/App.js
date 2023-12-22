import './App.css';

import ChatBot from './ChatBot';


function App() {
  

  return (


    <div className="container">
      <div className="row">
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <div className="card-title">Chat</div>
              <hr />
            </div>
            <ChatBot/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
