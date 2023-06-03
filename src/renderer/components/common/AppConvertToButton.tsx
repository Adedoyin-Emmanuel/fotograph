import React, { FormEvent } from 'react';
import { Form } from 'react-bootstrap';

interface AppConvertToButtonProps {
  className?: string;
  others?: any;
  values: string[];
}

const AppConvertToButton = ({
  className,
  others,
  values,
}: AppConvertToButtonProps): JSX.Element => {
  return (
    <React.Fragment>
      <Form.Select
        className={`convert-to brand-white-text text-capitalize brand-small-text-2 ${className}`}
        {...others}
        name="converting_to"
      >
        {values &&
          values.map((value, index) => {
            return (
              <option
                key={index}
                value={value}
                className="text-capitalize brand-small-text-2"
              >
                {value}
              </option>
            );
          })}
      </Form.Select>
    </React.Fragment>
  );
};

export default AppConvertToButton;
