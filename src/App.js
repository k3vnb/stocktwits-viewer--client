import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import config from './config';
import useInterval from './hooks/useInterval';
import AppContext from './AppContext';
import ChipContainer from './components/ChipContainer/ChipContainer';
import SearchBar from './components/SearchBar/SearchBar';
import TweetContainer from './components/TweetContainer/TweetContainer';
import TweetPage from './components/TweetContainer/TweetPage';
import { LoadingSpinner } from './components/LoadingSpinner/LoadingSpinner';
import EmptyPage from './components/EmptyPage/EmptyPage';
import './App.css';

const App = () => {
  const [syncData, setSyncData] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tweetStream, setTweetStream] = useState([]);
  const [selectedSymbols, setSelectedSymbols] = useState([]);

  useEffect(() => {
    if (selectedSymbols.length) {
      setLoading(true);
      const queryString = selectedSymbols.map(({ symbol }) => symbol).join('+');
      const getUpdatedStream = async () =>
        fetch(`${config.API_ENDPOINT}/symbols/${queryString}`);

      getUpdatedStream()
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error('Could not fetch data');
        })
        .then((stream) => {
          setLoading(false);
          let verifyStream = stream;
          if (stream.response && stream.response.status !== 200) {
            verifyStream = tweetStream;
          }
          setError('');
          return setTweetStream(verifyStream);
        })
        .catch((err) => {
          setLoading(false);
          setError(`Oops. ${err.message}`);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [syncData]);

  // calls to update the tweet streams will occur at this interval
  useInterval(() => setSyncData(syncData + 1), 60000);

  const addSelectedSymbol = async (newSymbol) => {
    setLoading(true);
    setSelectedSymbols([...selectedSymbols, newSymbol]);
    fetch(`${config.API_ENDPOINT}/add/${newSymbol.symbol}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Could not fetch data');
      })
      .then((newStream) => {
        setTweetStream([...tweetStream, newStream]);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(`Oops. ${err.message}`);
      });
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
    loading,
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
            'Select a stock from the searchbar to start watching stock tweets.'
          }
        />
      )}
      {loading && <LoadingSpinner />}
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
            <Route
              render={() => (
                <EmptyPage message="Error 404. Cannot find this page." />
              )}
            />
          </Switch>
        </main>
      </div>
    </AppContext.Provider>
  );
};

export default App;
