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
          <p className="brand-white-text fs-5 fw-bold text-capitalize text-center">
            {textPrompt && textPrompt}
          </p>
        </section>
        <section className="image-section w-100 d-flex align-items-center justify-content-center my-4">
          <img
            src={imageSource && imageSource}
            alt="generated-with-ai"
            className="img-fluid"
          />
        </section>
      </section>
    </React.Fragment>
  );
};

export default AppImagePreview;
