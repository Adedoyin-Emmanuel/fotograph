import React, { useRef } from 'react';

interface AppSearchProps {
  className?: string;
  onSubmit: (e: any) => void;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement> & {
    ref?: React.Ref<any>;
  };
  placeholder?: string;
}

const AppSearch = ({
  className,
  inputProps,
  onSubmit,
  placeholder,
}: AppSearchProps): JSX.Element => {
  const inputRef = useRef<any>(null);

  if (inputProps?.ref) {
    inputRef.current = inputProps.ref;
  }
  return (
    <React.Fragment>
      <form
        className={`d-flex align-items-center justify-content-center form w-100 flex-column ${className}`}
        onSubmit={onSubmit}
      >
        <input
          type="search"
          className="form-control search-element brand-small-text-2"
          placeholder={
            placeholder ? placeholder : 'Search any image gift, cars, birds'
          }
          ref={inputRef}
          {...inputProps} // Spread the inputProps for dynamic props on the input element
        />
      </form>
    </React.Fragment>
  );
};

export default AppSearch;
