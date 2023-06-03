import React from 'react';

interface SpinnerProps {
  className?: string;
}
const AppSpinner = ({ className }: SpinnerProps) => {
  return (
    <React.Fragment>
      <section id="spinner" className={`spinner ${className}`}>
        <section
          className="dot-windmill spinner-child"
          id="spinner-child"
        ></section>
      </section>
    </React.Fragment>
  );
};
export default AppSpinner;
