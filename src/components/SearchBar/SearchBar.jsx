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
  const [searchTerms, setSearchTerms] = useState([]);
  const [resultsError, setResultsError] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResultsLoading, setSearchResultsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [searchResultPosition, setSearchResultPosition] = useState({
    top: 0,
    width: 0,
  });
  const searchInputRef = useRef(null);

  // get position of searchbar to anchor flyout menu absolute position
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
    if (searchTerms.length) return setShowSearchResults(true);
    return setShowSearchResults(false);
  }, [searchTerms]);

  const toggleShowSearchResults = () =>
    setShowSearchResults(!showSearchResults);

  const fetchData = () => {
    if (searchTerms.length && searchTerms.every((term) => term.length)) {
      setSearchResultsLoading(true);
      setResultsError('');
      const response = async () =>
        Promise.all(
          searchTerms.map((searchTerm) =>
            fetch(`${config.API_ENDPOINT}/search/${searchTerm}`)
              .then((res) => {
                if (res.ok) {
                  return res.json();
                }
                throw new Error('Could not fetch data');
              })
              .then(({ results }) => results)
              .catch((err) => {
                setError(`Oops. ${err.message}`);
              })
          )
        );
      response().then((symbolDataArr) => {
        setSearchResultsLoading(false);
        // make sure none of the values in the array are undefined
        if (symbolDataArr.length && symbolDataArr.every((symbol) => symbol))
          return !!symbolDataArr && setResults(symbolDataArr);
        return setResultsError('Cannot fetch data, try again later');
      });
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetchData(), [searchTerms]);

  const setNewSearchString = (e) => {
    setSearchTerms(e.target.value.split(','));
  };

  const clearSearchTerms = () => setSearchTerms([]);

  const flatMapResults = results.flatMap((result) => result);
  return (
    <div className="search-bar__container">
      <TextField
        inputRef={searchInputRef}
        value={searchTerms}
        fullWidth
        label="Search Stock Symbols"
        title="Search multiple companies by inserting a comma (ie, 'apple,amazon')"
        variant="filled"
        onChange={setNewSearchString}
        autoFocus
        autoComplete="off"
      />
      {showSearchResults && (
        <SearchResultsFlyout
          position={searchResultPosition}
          searchResults={flatMapResults}
          toggleShowSearchResults={toggleShowSearchResults}
          clearSearchTerm={clearSearchTerms}
          setSearchResults={setResults}
          searchResultsLoading={searchResultsLoading}
          errorMessage={resultsError}
        />
      )}
    </div>
  );
};

export default SearchBar;
