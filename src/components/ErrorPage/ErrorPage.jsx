import React from 'react';
import { string } from 'prop-types';

const ErrorPage = ({ errorMessage }) => {
  return <div className="error-page">{errorMessage}</div>;
};

ErrorPage.propTypes = {
  errorMessage: string.isRequired,
};

export default ErrorPage;
