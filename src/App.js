import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import useInterval from './hooks/useInterval';
import AppContext from './AppContext';
import ChipContainer from './components/ChipContainer/ChipContainer';
import SearchBar from './components/SearchBar/SearchBar';
import TweetContainer from './components/TweetContainer/TweetContainer';
import TweetPage from './components/TweetContainer/TweetPage';
// import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import EmptyPage from './components/EmptyPage/EmptyPage';
import './App.css';

const App = () => {
  const [syncData, setSyncData] = useState(0);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tweetStream, setTweetStream] = useState([]);
  const [selectedSymbols, setSelectedSymbols] = useState([]);

  useEffect(() => {
    if (selectedSymbols.length) {
      const queryString = selectedSymbols.map(({ symbol }) => symbol).join('+');
      const getUpdatedStream = async () =>
        fetch(`http://localhost:8001/api/symbols/${queryString}`);

      getUpdatedStream()
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error('Could not fetch data');
        })
        .then((stream) => setTweetStream(stream || [...tweetStream]))
        .catch((err) => setError(`Oops. ${err.message}`));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [syncData]);

  // calls to update the tweet streams will occur at this interval
  useInterval(() => setSyncData(syncData + 1), 60000);

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
      {tweetStream.length ? (
        <TweetContainer />
      ) : (
        <EmptyPage
          message={
            error ||
            'Select a stock from the searchbar to start watching stock tweets'
          }
        />
      )}
      {/* {loading && <LoadingSpinner />} */}
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
        </main>
      </div>
    </AppContext.Provider>
  );
};

export default App;
