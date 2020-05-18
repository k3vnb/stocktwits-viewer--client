import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import SearchResultsFlyout from '../SearchResultsFlyout/SearchResultsFlyout';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const toggleShowSearchResults = () =>
    setShowSearchResults(!showSearchResults);
  const clearSearchTerm = () => setSearchTerm('');
  useEffect(() => {
    if (searchTerm.length > 1) {
      return setShowSearchResults(true);
    }
    return setShowSearchResults(false);
  }, [searchTerm]);
  const setNewSearchString = async (e) => {
    setSearchTerm(e.target.value);
    // character length is set to mitigate exceeding rate limit
    if (searchTerm.length > 2 && searchTerm.length < 5) {
      const searchResultsList = await fetch(
        `http://localhost:8001/api/${e.target.value}`
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error('Could not fetch data');
        })
        .catch((err) => console.error(err));
      if (searchResultsList) {
        setSearchResults(searchResultsList.results);
      }
    }
  };
  return (
    <>
      <TextField
        value={searchTerm}
        fullWidth
        label="Search Stock Symbols"
        variant="filled"
        onChange={setNewSearchString}
        autoFocus
        autoComplete="off"
      />
      {showSearchResults && (
        <SearchResultsFlyout
          searchResults={searchResults}
          toggleShowSearchResults={toggleShowSearchResults}
          clearSearchTerm={clearSearchTerm}
        />
      )}
    </>
  );
};

export default SearchBar;
