import React, { useContext } from 'react';
import { shape, string, arrayOf, number, func } from 'prop-types';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import AppContext from '../../AppContext';
import './SearchResultsFlyout.css';

const AutoCompleteFlyout = ({
  searchResults,
  setSearchResults,
  position: { top, width },
  toggleShowSearchResults,
  clearSearchTerm,
}) => {
  const { selectedSymbols, addSelectedSymbol } = useContext(AppContext);
  const handleSelectSymbol = (symbol) => {
    if (selectedSymbols.find(({ id }) => id === symbol.id)) {
      return alert('This symbol has already been selected');
    }
    addSelectedSymbol(symbol);
    clearSearchTerm();
    setSearchResults([]);
    return toggleShowSearchResults();
  };
  const handleKeyDown = (e, symbol) => {
    if (e.key === 'Enter') {
      return handleSelectSymbol(symbol);
    }
  };
  return (
    <ClickAwayListener onClickAway={toggleShowSearchResults}>
      {searchResults.length ? (
        <div className="search-results__container" style={{ top, width }}>
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
        </div>
      ) : (
        <div className="search-results__container" style={{ top, width }}>
          No matching results found
        </div>
      )}
    </ClickAwayListener>
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
  position: shape({
    top: number.isRequired,
    width: number.isRequired,
  }).isRequired,
  toggleShowSearchResults: func.isRequired,
  setSearchResults: func.isRequired,
  clearSearchTerm: func.isRequired,
};

AutoCompleteFlyout.defaultProps = {
  searchResults: [],
};

export default AutoCompleteFlyout;
