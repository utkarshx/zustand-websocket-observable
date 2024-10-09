import React from 'react';
import WebSocketComponent from './WebSocketComponent';
import ListComponent from './ListComponent';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the WebSocket React App</h1>
        <WebSocketComponent />
        <ListComponent />
      </header>
    </div>
  );
}

export default App;
