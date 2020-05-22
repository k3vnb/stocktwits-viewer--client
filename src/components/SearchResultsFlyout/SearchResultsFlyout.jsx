import React, { useContext } from 'react';
import { Checkbox, Button } from '@material-ui/core';
import { shape, string, arrayOf, number, func, bool } from 'prop-types';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { SmallLoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import AppContext from '../../AppContext';
import './SearchResultsFlyout.css';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AutoCompleteFlyout = ({
  searchResults,
  position: { top, width },
  toggleShowSearchResults,
  clearSearchTerm,
  errorMessage,
  searchResultsLoading,
}) => {
  const {
    selectedSymbols,
    addSelectedSymbol,
    removeSelectedSymbol,
  } = useContext(AppContext);

  const handleChecked = (e) => {
    const symbolObj = JSON.parse(e.target.value);
    if (selectedSymbols.some(({ id }) => id === symbolObj.id)) {
      return removeSelectedSymbol(symbolObj.id);
    }
    return addSelectedSymbol(symbolObj);
  };

  const closeFlyout = () => {
    clearSearchTerm();
    toggleShowSearchResults();
  };

  return (
    <ClickAwayListener onClickAway={toggleShowSearchResults}>
      <div className="search-results__container--outer">
        {searchResults.length ? (
          <div
            className="search-results__container--inner"
            style={{ top, width }}
          >
            {searchResults.map((symbolObj) => (
              <div
                className="results__list-item"
                key={symbolObj.id}
                role="presentation"
              >
                <Checkbox
                  icon={icon}
                  id="results-list-checkbox"
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selectedSymbols.some(
                    ({ id }) => id === symbolObj.id
                  )}
                  value={JSON.stringify(symbolObj)}
                  onChange={handleChecked}
                />
                <label
                  htmlFor="results-list-checkbox"
                  className="results__list-item--label"
                >
                  <span className="results__list-item--title">
                    {`${symbolObj.symbol} - `}
                  </span>
                  <span className="results__list-item--subtitle">
                    {symbolObj.title}
                  </span>
                </label>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="search-results__container--error-message"
            style={{ top, width }}
          >
            {errorMessage || 'No matching results found'}
          </div>
        )}
        {searchResultsLoading && <SmallLoadingSpinner />}
        <Button className="flyout-close-btn" onClick={closeFlyout}>
          Close
        </Button>
      </div>
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
  errorMessage: string.isRequired,
  toggleShowSearchResults: func.isRequired,
  clearSearchTerm: func.isRequired,
  searchResultsLoading: bool.isRequired,
};

AutoCompleteFlyout.defaultProps = {
  searchResults: [],
};

export default AutoCompleteFlyout;
