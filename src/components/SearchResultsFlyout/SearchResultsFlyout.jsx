import React, { useContext } from 'react';
import { shape, string, arrayOf, number, func } from 'prop-types';
import AppContext from '../../AppContext';
import './SearchResultsFlyout.css';

const AutoCompleteFlyout = ({
  searchResults,
  toggleShowSearchResults,
  clearSearchTerm,
}) => {
  const { selectedSymbols, addSelectedSymbol } = useContext(AppContext);
  const handleSelectSymbol = (symbol) => {
    // console.log(symbol);
    if (selectedSymbols.find(({ id }) => id === symbol.id)) {
      return alert('This symbol has already been selected');
    }
    addSelectedSymbol(symbol);
    clearSearchTerm();
    return toggleShowSearchResults();
  };
  const handleKeyDown = (e, symbol) => {
    if (e.key === 'Enter') {
      return handleSelectSymbol(symbol);
    }
  };
  return (
    <div className="search-results__container">
      {searchResults.length ? (
        <>
          <button type="button" onClick={toggleShowSearchResults}>
            Close
          </button>
          {searchResults.map((symbolObj) => (
            <div
              className="results__list-item"
              key={symbolObj.id}
              onClick={() => handleSelectSymbol(symbolObj)}
              onKeyDown={(e) => handleKeyDown(e, symbolObj)}
              role="presentation"
            >
              <h4 className="results__list-item--title">{symbolObj.symbol}</h4>
              <h5 className="results__list-item--subtitle">
                {symbolObj.title}
              </h5>
            </div>
          ))}
        </>
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
  toggleShowSearchResults: func.isRequired,
  clearSearchTerm: func.isRequired,
};

AutoCompleteFlyout.defaultProps = {
  searchResults: [],
};

export default AutoCompleteFlyout;
