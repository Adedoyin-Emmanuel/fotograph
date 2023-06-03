import React from 'react';
import Logo from './../../../../assets/logo.png';
import AppButton from './Button';
const AppWelcome = () => {
  return (
    <React.Fragment>
      <section className="welcome-container d-flex align-items-center justify-content-center flex-column">
        <section className="logo-container p-2">
          <h1 className="display-6 fw-bold text-capitalize text-center">
            <span className="brand-primary-text foto-container">foto</span>{' '}
            <span className="text-light">Graph</span>
          </h1>
        </section>
      </section>
    </React.Fragment>
  );
};

export default AppWelcome;
