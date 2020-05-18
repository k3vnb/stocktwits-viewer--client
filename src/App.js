import React, { useState, useEffect } from 'react';
import AppContext from './AppContext';
import socketIOClient from 'socket.io-client';
import SearchBar from './components/SearchBar/SearchBar';

const ENDPOINT = 'http://localhost:8000?params=AAPL,MSFT';

function App() {
  const [response, setResponse] = useState('');
  const [selectedSymbols, setSelectedSymbols] = useState([]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('FromAPI', (data) => {
      setResponse(data);
    });
    console.log(response);
  }, [response]);

  const addSelectedSymbol = (newSymbol) =>
    setSelectedSymbols([...selectedSymbols, newSymbol]);
  const removeSelectedSymbol = (symbolId) =>
    setSelectedSymbols(selectedSymbols.filter(({ id }) => id !== symbolId));

  const contextVal = {
    selectedSymbols,
    addSelectedSymbol,
    removeSelectedSymbol,
  };

  return (
    <AppContext.Provider value={contextVal}>
      <div className="app">
        <header>
          <h1>Stocktwits</h1>
        </header>
        <main>
          <SearchBar />
        </main>
      </div>
    </AppContext.Provider>
  );
}

export default App;
