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

  const regexMessageBody = (str) => {
    const urlRE = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
    const symbolRE = /(\s\$[A-Z]+)|(^\$[A-Z]+)/gim;
    const matchURL = str.match(urlRE);
    const url = matchURL && matchURL[0];
    const matchSymbol = str.match(symbolRE);
    let newStr = str.replace(
      url,
      `<a href=${url} target="_blank" rel="noopener" style="font-size: .75rem; font-family: Arial, Helvetica, sans-serif;">${url}</a>`
    );
    const addSymbolStyles = (str_, symbol) => {
      const symbolSubstr = symbol.trim().substring(1);
      newStr = str_.replace(
        symbol,
        `<a href="https://stocktwits.com/symbol/${symbolSubstr}" target="_blank" rel="noopener" style="color: #19ad19; text-decoration: none">${symbol}</a>`
      );
    };
    if (matchSymbol && matchSymbol.length) {
      matchSymbol.forEach((match) => addSymbolStyles(newStr, match));
    }
    return newStr;
  };

  const newBody = regexMessageBody(body);

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
          dangerouslySetInnerHTML={{ __html: newBody }}
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
