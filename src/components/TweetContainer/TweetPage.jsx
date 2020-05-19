import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import AppContext from '../../AppContext';
import Tweet from './Tweet';

const TweetPage = () => {
  const { goBack } = useHistory();
  const { symbolId } = useParams();
  const symbolIdToNumber = Number(symbolId);
  const { tweetStream } = useContext(AppContext);
  const checkSymbolId = () => {
    if (Number.isNaN(symbolId)) return false;
    const validIds = tweetStream.map(({ symbol }) => symbol.id);
    return validIds.some((id) => id === symbolIdToNumber);
  };

  return (
    <section>
      <Button onClick={goBack} variant="contained" className="go-back-btn">
        Go Back
      </Button>
      {checkSymbolId() &&
        tweetStream.map(({ symbol, messages }) => {
          if (symbol.id === symbolIdToNumber) {
            const messageCount = messages.length;
            return (
              <div key={symbol.id} className="symbol__tweets-container">
                <h4>{`${symbol.symbol} - ${symbol.title}`}</h4>
                <h5></h5>
                <h6>{`Showing ${messageCount} of ${messages.length} Tweets`}</h6>
                {messages.map((message) => (
                  <Tweet key={message.id} tweetProps={message} />
                ))}
              </div>
            );
          }
        })}
      {!checkSymbolId() && <div>Cannot find data for this stock symbol</div>}
    </section>
  );
};

export default TweetPage;
