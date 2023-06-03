import { AnyRecordWithTtl } from 'dns';
import React from 'react';
import { Button } from 'react-bootstrap';

interface AppButtonProp {
  className?: string;
  children?: any | JSX.Element;
  onClick?: (e?: any) => any;
  others?: any;
}
const AppButton = ({
  className,
  children,
  onClick,
  others,
}: AppButtonProp): JSX.Element => {
  return (
    <React.Fragment>
      <Button
        className={`brand-button ${className}`}
        onClick={onClick}
        {...others}
      >
        {children && children}
      </Button>
    </React.Fragment>
  );
};

export default AppButton;
