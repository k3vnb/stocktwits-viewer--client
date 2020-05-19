/* eslint-disable camelcase */
import React from 'react';
import { shape, string } from 'prop-types';

const Tweet = ({ tweetProps }) => {
  const {
    body,
    created_at,
    sentiment,
    user: { avatar_url_ssl, username },
  } = tweetProps;
  return (
    <article className="tweet">
      <div className="tweet__avatar-container">
        <img src={avatar_url_ssl} alt="user avatar" />
      </div>
      <div className="tweet__content">
        <div className="tweet__content--user-info">
          <span className="username">{username}</span>
          <span className="status-chip">{sentiment && sentiment.basic}</span>
        </div>
        <div className="tweet__content--body">{body}</div>
        <div className="tweet__content--footer">{created_at}</div>
      </div>
    </article>
  );
};

Tweet.propTypes = {
  tweetProps: shape({
    body: string.isRequired,
    created_at: string.isRequired,
    sentiment: string,
    user: shape({
      avatar_url_ssl: string.isRequired,
      username: string.isRequired,
    }).isRequired,
  }),
};

Tweet.defaultProps = {
  tweetProps: {},
};

export default Tweet;
