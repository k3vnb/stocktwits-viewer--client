import React from 'react';

const AppContext = React.createContext({
  selectedSymbols: [],
  addSelectedSymbol: () => {},
  removeSelectedSymbol: () => {},
});

export default AppContext;
