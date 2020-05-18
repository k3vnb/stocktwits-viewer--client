import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import AppContext from './AppContext';
import ChipContainer from './components/ChipContainer/ChipContainer';
import SearchBar from './components/SearchBar/SearchBar';

const ENDPOINT = 'http://localhost:8000?params=';

function App() {
  const [response, setResponse] = useState('');
  const [selectedSymbols, setSelectedSymbols] = useState([
    {
      exchange: 'NYSE',
      id: 12144,
      symbol: 'CTLT',
      title: 'Catalent',
      type: 'symbol',
    },
  ]);

  useEffect(() => {
    if (selectedSymbols.length) {
      const queryString = selectedSymbols.map(({ symbol }) => symbol).join(',');
      const socket = socketIOClient(`${ENDPOINT}/${queryString}`);
      socket.on('FromAPI', (data) => {
        setResponse(data);
      });
      console.log(response);
    }
  }, [response, selectedSymbols]);

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
          <ChipContainer />
          <SearchBar />
        </main>
      </div>
    </AppContext.Provider>
  );
}

export default App;
