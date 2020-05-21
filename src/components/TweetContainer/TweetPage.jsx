import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import AppContext from '../../AppContext';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import Tweet from './Tweet';
import './TweetContainer.css';

const TweetPage = () => {
  const { goBack } = useHistory();
  const { symbolId } = useParams();
  const symbolIdToNumber = Number(symbolId);
  const { tweetStream, loading } = useContext(AppContext);
  const checkSymbolId = () => {
    if (Number.isNaN(symbolId)) return false;
    const validIds = tweetStream.map(({ symbol }) => symbol.id);
    return validIds.some((id) => id === symbolIdToNumber);
  };
  const currentTweetStream = tweetStream.length
    ? tweetStream.find(({ symbol }) => symbol.id === symbolIdToNumber)
    : {};

  return (
    <section className="tweet-page">
      <Button onClick={goBack} variant="contained" className="go-back-btn">
        Go Back
      </Button>
      {checkSymbolId() && currentTweetStream.symbol && (
        <>
          <h3 className="tweet-page__page-title">
            {`${currentTweetStream.symbol.title} Tweets Page`}
          </h3>
          <div className="symbol__tweets-container">
            <h4>{`${currentTweetStream.symbol.symbol} - ${currentTweetStream.symbol.title}`}</h4>
            <h6>{`Showing ${currentTweetStream.messages.length} of ${currentTweetStream.messages.length} Tweets`}</h6>
            {currentTweetStream.messages.map((message) => (
              <Tweet key={message.id} tweetProps={message} />
            ))}
          </div>
        </>
      )}
      {!checkSymbolId() && (
        <div style={{ textAlign: 'center' }}>
          Cannot find data for this stock symbol. Click &apos;Go Back&apos; and
          try again.
        </div>
      )}
      {loading && <LoadingSpinner />}
    </section>
  );
};

export default TweetPage;
