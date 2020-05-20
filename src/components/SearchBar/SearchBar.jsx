import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useContext,
} from 'react';
import { TextField } from '@material-ui/core';
import config from '../../config';
import AppContext from '../../AppContext';
import SearchResultsFlyout from '../SearchResultsFlyout/SearchResultsFlyout';
import './SearchBar.css';

const SearchBar = () => {
  const { setError } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultPosition, setSearchResultPosition] = useState({
    top: 0,
    width: 0,
  });
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchInputRef.current) {
      setSearchResultPosition({
        top: searchInputRef.current.getBoundingClientRect().bottom,
        width: searchInputRef.current.getBoundingClientRect().width,
      });
    }
  }, [searchInputRef]);

  useLayoutEffect(() => {
    function updatePosition() {
      setSearchResultPosition({
        top: searchInputRef.current.getBoundingClientRect().bottom,
        width: searchInputRef.current.getBoundingClientRect().width,
      });
    }
    window.addEventListener('resize', updatePosition);
    updatePosition();
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  useEffect(() => {
    if (searchTerm.length > 1) {
      return setShowSearchResults(true);
    }
    return setShowSearchResults(false);
  }, [searchTerm]);

  const setNewSearchString = (e) => {
    setSearchTerm(e.target.value);
    // character length is set to mitigate exceeding rate limit
    if (searchTerm.length && searchTerm.length < 12) {
      fetch(`${config.API_ENDPOINT}/search/${e.target.value}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error('Could not fetch data');
        })
        .then(({ results }) => setSearchResults(results))
        .catch((err) => {
          setError(`Oops. ${err.message}`);
        });
    }
  };

  const toggleShowSearchResults = () =>
    setShowSearchResults(!showSearchResults);

  const clearSearchTerm = () => setSearchTerm('');

  return (
    <div className="search-bar__container">
      <TextField
        inputRef={searchInputRef}
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
          position={searchResultPosition}
          searchResults={searchResults}
          toggleShowSearchResults={toggleShowSearchResults}
          clearSearchTerm={clearSearchTerm}
          setSearchResults={setSearchResults}
        />
      )}
    </div>
  );
};

export default SearchBar;
