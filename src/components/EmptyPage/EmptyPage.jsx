import React from 'react';
import { string } from 'prop-types';
import StockmarketSVG from '../../img/StockmarketSVG';
import './EmptyPage.css';

const EmptyPage = ({ message }) => {
  return (
    <div className="empty-page__container">
      <span className="empty-page__text">{message}</span>
      <StockmarketSVG />
      <span className="empty-page__subtext">
        Icon made by{' '}
        <a href="https://www.flaticon.com/authors/geotatah" title="geotatah">
          geotatah
        </a>{' '}
        from{' '}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </span>
    </div>
  );
};

EmptyPage.propTypes = {
  message: string.isRequired,
};

export default EmptyPage;
