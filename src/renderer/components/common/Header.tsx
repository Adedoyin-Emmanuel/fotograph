import React from 'react';

interface AppHeaderProps {
  className?: string;
  others?: any;
  children: string;
}

const AppHeader = ({
  className,
  others,
  children,
}: AppHeaderProps): JSX.Element => {
  return (
    <React.Fragment>
      <h3
        className={`app-h3 fw-bold fs-3 text-light ${className}`}
        {...others}
        id="top"
      >
        {children && children}
      </h3>
    </React.Fragment>
  );
};

export default AppHeader;
