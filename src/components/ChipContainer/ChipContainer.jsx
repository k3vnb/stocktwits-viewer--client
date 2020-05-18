import React, { useState, useEffect, useContext } from 'react';
import Chip from '@material-ui/core/Chip';
import AppContext from '../../AppContext';

const ChipContainer = () => {
  const { selectedSymbols, removeSelectedSymbol } = useContext(AppContext);
  const [alphabetizedSymbols, setAlphabetizedSymbols] = useState([]);
  useEffect(() => {
    const sortSymbols = selectedSymbols.sort((a, b) => {
      if (a.symbol > b.symbol) return 1;
      return -1;
    });
    setAlphabetizedSymbols(sortSymbols);
  }, [selectedSymbols]);
  const handleDelete = (id) => removeSelectedSymbol(id);

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };
  return (
    <section className="chip-container">
      <h3 className="chip-container__title">Your Symbols:</h3>
      <p>
        Click the symbol name to go to the symbol page or click delete icon to
        remove it from the list
      </p>
      <div className="chip-container__chips">
        {alphabetizedSymbols.map(({ id, symbol, title }) => (
          <Chip
            title={title}
            key={id}
            label={symbol}
            clickable
            color="primary"
            onClick={handleClick}
            onDelete={() => handleDelete(id)}
          />
        ))}
      </div>
      {!selectedSymbols.length && <div>You have not selected any symbols</div>}
    </section>
  );
};

export default ChipContainer;
