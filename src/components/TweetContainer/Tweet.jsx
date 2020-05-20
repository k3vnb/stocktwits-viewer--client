/* eslint-disable camelcase */
import React from 'react';
import { shape, string } from 'prop-types';
import Moment from 'react-moment';

const Tweet = ({ tweetProps }) => {
  const {
    body,
    created_at,
    likes,
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
        </div>
        <div
          className="tweet__content--body"
          dangerouslySetInnerHTML={{ __html: body }}
        />
        <div className="tweet__content--footer">
          <Moment fromNow>{created_at}</Moment>
          {!!likes && (
            <div className="tweet__content--likes">
              <img
                src="https://img.icons8.com/wired/64/000000/thumb-up.png"
                alt="likes"
              />
              {likes.total}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

Tweet.propTypes = {
  tweetProps: shape({
    body: string.isRequired,
    created_at: string.isRequired,
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
