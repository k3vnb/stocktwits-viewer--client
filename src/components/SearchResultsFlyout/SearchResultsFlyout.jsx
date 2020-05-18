import React from 'react';
import { shape, string, arrayOf, number } from 'prop-types';

const AutoCompleteFlyout = ({ searchResults }) => {
  // console.log(searchResults);
  return (
    <div className="search-results__container">
      {searchResults.length ? (
        <ul>
          {searchResults.map(({ symbol, title, id }) => (
            <li key={id}>
              <h4>{symbol}</h4>
              <h5>{title}</h5>
            </li>
          ))}
        </ul>
      ) : (
        <div>No matching results found</div>
      )}
    </div>
  );
};

AutoCompleteFlyout.propTypes = {
  searchResults: arrayOf(
    shape({
      exchange: string.isRequired,
      id: number.isRequired,
      symbol: string.isRequired,
      title: string.isRequired,
      type: string.isRequired,
    }).isRequired
  ),
};

AutoCompleteFlyout.defaultProps = {
  searchResults: [],
};

export default AutoCompleteFlyout;
