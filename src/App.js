import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import SearchBar from './components/SearchBar/SearchBar';

const ENDPOINT = 'http://localhost:8000?params=AAPL,MSFT';

function App() {
  const [response, setResponse] = useState('');

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('FromAPI', (data) => {
      setResponse(data);
    });
    console.log(response);
  }, [response]);

  return (
    <div className="app">
      <header>
        <h1>Stocktwits</h1>
      </header>
      <main>
        <SearchBar />
      </main>
    </div>
  );
}

export default App;
