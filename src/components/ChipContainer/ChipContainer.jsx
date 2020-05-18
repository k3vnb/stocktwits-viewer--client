import React, { useContext } from 'react';
import Chip from '@material-ui/core/Chip';
import AppContext from '../../AppContext';

const ChipContainer = () => {
  const { selectedSymbols, removeSelectedSymbol } = useContext(AppContext);
  const handleDelete = (id) => removeSelectedSymbol(id);

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };
  return (
    <section className="chip-container">
      <h3 className="chip-container__title">Your Symbols:</h3>
      <div className="chip-container__chips">
        {selectedSymbols.map(({ id, symbol, title }) => (
          <Chip
            title={`Go to ${title} page`}
            key={id}
            label={symbol}
            clickable
            color="primary"
            onClick={handleClick}
            onDelete={() => handleDelete(id)}
          />
        ))}
      </div>
    </section>
  );
};

export default ChipContainer;
