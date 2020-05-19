import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import AppContext from './AppContext';
import ChipContainer from './components/ChipContainer/ChipContainer';
import SearchBar from './components/SearchBar/SearchBar';
import TweetContainer from './components/TweetContainer/TweetContainer';

const ENDPOINT = 'http://localhost:8000?params=';

const App = () => {
  const [response, setResponse] = useState('');
  const [tweetStream, setTweetStream] = useState([]);
  const [selectedSymbols, setSelectedSymbols] = useState([]);

  useEffect(() => {
    const queryString = selectedSymbols.map(({ symbol }) => symbol).join(',');
    if (selectedSymbols.length > 1) {
      const socket = socketIOClient(`${ENDPOINT}/${queryString}`);
      socket.on('FromAPI', (data) => {
        setResponse(data);
      });
      setTweetStream(response || []);
    }
  }, [response, selectedSymbols]);

  const addSelectedSymbol = async (newSymbol) => {
    setSelectedSymbols([...selectedSymbols, newSymbol]);
    const newStream = await fetch(
      `http://localhost:8001/api/add/${newSymbol.symbol}`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Could not fetch data');
      })
      .catch((err) => console.error(err));
    return setTweetStream([...tweetStream, newStream]);
  };
  const removeSelectedSymbol = (symbolId) =>
    setSelectedSymbols(selectedSymbols.filter(({ id }) => id !== symbolId));

  const contextVal = {
    selectedSymbols,
    tweetStream,
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
          <TweetContainer />
        </main>
      </div>
    </AppContext.Provider>
  );
};

export default App;
