import React from 'react';

const AppContext = React.createContext({
  selectedSymbols: [],
  tweetStream: [],
  addSelectedSymbol: () => {},
  removeSelectedSymbol: () => {},
});

export default AppContext;
