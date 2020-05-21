import React from 'react';
import './LoadingSpinner.css';

const Spinner = () => (
  <div className="lds-default">
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
  </div>
);

export const SmallLoadingSpinner = () => (
  <div className="loading-spinner-container loading-spinner-container--small">
    <Spinner />
  </div>
);

export const LoadingSpinner = () => (
  <div className="loading-spinner-container loading-spinner-container--full-page">
    <Spinner />
  </div>
);
