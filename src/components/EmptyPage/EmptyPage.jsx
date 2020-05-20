import React from 'react';
import StockmarketSVG from '../../img/StockmarketSVG';
import './EmptyPage.css';

const EmptyPage = () => {
  return (
    <div className="empty-page__container">
      <span className="empty-page__text">
        Select a stock from the searchbar to start watching stock tweets
      </span>
      <StockmarketSVG />
    </div>
  );
};

export default EmptyPage;
