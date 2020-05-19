import React, { useContext } from 'react';
import AppContext from '../../AppContext';
import Tweet from './Tweet';
import './TweetContainer.css';

const TweetContainer = () => {
  const { selectedSymbols, tweetStream } = useContext(AppContext);
  /*
    Due to a delay in the web socket retrieval of new data,
    a user may delete a selected symbol but not see the update for several seconds.
    Here we check and render only the tweets for selected symbols.
  */
  const selectedSymbolsIds = selectedSymbols.map(({ id }) => id);

  const showTweets = tweetStream.length ? (
    tweetStream.map(({ symbol, messages }) => {
      if (selectedSymbolsIds.indexOf(symbol.id) !== -1) {
        return (
          <div key={symbol.id}>
            <h4>{symbol.symbol}</h4>
            <h5>{symbol.title}</h5>
            {messages.map((message) => (
              <Tweet key={message.id} tweetProps={message} />
            ))}
          </div>
        );
      }
    })
  ) : (
    <div>You have no tweet data</div>
  );
  console.log(showTweets);
  return <div className="symbols-tweets__container">{showTweets}</div>;
};

export default TweetContainer;
