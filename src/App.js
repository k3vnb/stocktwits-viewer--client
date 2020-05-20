import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import AppContext from './AppContext';
import ChipContainer from './components/ChipContainer/ChipContainer';
import SearchBar from './components/SearchBar/SearchBar';
import TweetContainer from './components/TweetContainer/TweetContainer';
import TweetPage from './components/TweetContainer/TweetPage';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import ErrorPage from './components/ErrorPage/ErrorPage';
import './App.css';
import EmptyPage from './components/EmptyPage/EmptyPage';

const ENDPOINT = 'http://localhost:8000?params=';

const App = () => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tweetStream, setTweetStream] = useState([]);
  const [selectedSymbols, setSelectedSymbols] = useState([]);

  useEffect(() => {
    const queryString = selectedSymbols.map(({ symbol }) => symbol).join(',');
    if (selectedSymbols.length) {
      setLoading(true);
      const socket = socketIOClient(`${ENDPOINT}/${queryString}`);
      socket.on('FromAPI', (data) => {
        if (data[0].response.status === 404) {
          console.error('Could not retrieve data');
          return setError('Could not retrieve data');
        }
        setResponse(data);
      });
      setTweetStream(() => response || [...tweetStream] || []);
      setLoading(false);
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

  const removeSelectedSymbol = (symbolId) => {
    const updatedSelectedSymbols = selectedSymbols.filter(
      ({ id }) => id !== symbolId
    );
    const updatedTweetStream = tweetStream.filter(
      ({ symbol }) => symbol.id !== symbolId
    );
    setSelectedSymbols(updatedSelectedSymbols);
    setTweetStream(updatedTweetStream);
  };

  const contextVal = {
    selectedSymbols,
    tweetStream,
    setError,
    addSelectedSymbol,
    removeSelectedSymbol,
  };

  const LandingPage = () => (
    <>
      <ChipContainer />
      {tweetStream.length ? <TweetContainer /> : <EmptyPage />}
    </>
  );

  return (
    <AppContext.Provider value={contextVal}>
      <div className="app">
        <header>
          <h1>Stocktwit Viewer</h1>
          <SearchBar />
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/symbol/:symbolId" component={TweetPage} />
          </Switch>
          {loading && <LoadingSpinner />}
          {error && <ErrorPage errorMessage={error} />}
        </main>
      </div>
    </AppContext.Provider>
  );
};

export default App;
