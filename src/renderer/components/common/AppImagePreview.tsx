import React from 'react';

interface AppImagePreviewProps {
  className?: string;
  imageSource: string;
  textPrompt: string;
}

const AppImagePreview = ({
  className,
  imageSource,
  textPrompt,
}: AppImagePreviewProps): JSX.Element => {
  return (
    <React.Fragment>
      <section
        className={`app-image-preview ${className} d-flex align-items-center justify-content-around rounded-3 my-1 w-100 shadow-sm flex-column`}
      >
        <section className="text-prompt w-100 my-3">
          <p className="brand-white-text brand-small-text text-capitalize text-start px-3">
            {textPrompt && textPrompt}
          </p>
        </section>
        <section className="image-section w-100 d-flex align-items-center justify-content-center">
          <img
            src={imageSource && imageSource}
            alt="generated-with-ai"
            className="img-fluid"
            width="100"
            height="100"
          />
        </section>
      </section>
    </React.Fragment>
  );
};

export default AppImagePreview;
