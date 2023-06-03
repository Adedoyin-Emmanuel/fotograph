import React from 'react';
const AppBackToTop = (): JSX.Element => {
  const scrollToTop = (): void => {
    document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <React.Fragment>
      <section
        className="arrow-up back-to-top d-flex justify-content-center align-items-center brand-primary-color"
        onClick={scrollToTop}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          className="bi bi-arrow-up text-white fw-bold"
          viewBox="0 0 16 16"
          onClick={scrollToTop}
        >
          <path d="M7.646 4.146a.5.5 0 0 1 .708 0L8 4.793l.646-.647a.5.5 0 0 1 .708.708l-1 1a.5.5 0 0 1-.708 0l-1-1a.5.5 0 0 1 0-.708z" />
          <path d="M8 15a.5.5 0 0 1-.5-.5V5.707L5.354 7.854a.5.5 0 0 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-.5.5z" />
        </svg>
      </section>
    </React.Fragment>
  );
};

export default AppBackToTop;
