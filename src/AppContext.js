import React from 'react';

const AppContext = React.createContext({
  selectedSymbols: [],
  tweetStream: [],
  loading: false,
  setError: () => {},
  addSelectedSymbol: () => {},
  removeSelectedSymbol: () => {},
});

export default AppContext;
