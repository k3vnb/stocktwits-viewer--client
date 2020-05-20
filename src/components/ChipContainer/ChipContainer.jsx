import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import AppContext from '../../AppContext';
import './ChipContainer.css';

const ChipContainer = () => {
  const { push } = useHistory();
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

  const handleClick = (id) => {
    push(`/symbol/${id}`);
  };
  return (
    <section className="chip-container">
      <h3 className="chip-container__title">
        Your
        <br />
        Symbols:
      </h3>
      <div className="chip-container__chips">
        {alphabetizedSymbols.map(({ id, symbol, title }) => (
          <Chip
            className="chip"
            title={title}
            key={id}
            label={symbol}
            clickable
            color="primary"
            onClick={() => handleClick(id)}
            onDelete={() => handleDelete(id)}
          />
        ))}
        {!selectedSymbols.length && (
          <div className="empty-message">You have not selected any symbols</div>
        )}
      </div>
    </section>
  );
};

export default ChipContainer;
