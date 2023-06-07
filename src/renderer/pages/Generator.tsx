import React, { FormEvent, useRef, useState } from 'react';
import AppLayout from 'renderer/components/layouts/AppLayout';
import AppHeader from 'renderer/components/common/Header';
import AppButton from 'renderer/components/common/Button';
import $ from 'jquery';
import AppSearch from 'renderer/components/common/AppSearch';
import AppSpinner from 'renderer/components/common/Spinner';
import AppImagePreview from 'renderer/components/common/AppImagePreview';
import Logo from './../../../assets/icon.png';

const Generator = (): JSX.Element => {
  const searchInputRef = useRef<any>(null);
  const [dataDonArrive, setDataDonArrive] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const inputElementProps = {
    autoComplete: 'off',
    ref: searchInputRef,
  };

  const handleSubmit = (event: FormEvent | any) => {
    event.preventDefault();
    console.log(event.target[0].value);
    setFormSubmitted(true);
  };

  return (
    <React.Fragment>
      <AppLayout
        className="app-content-scroll app-content-flex flex-column"
        onGeneratorPage={true}
      >
        <section className="convert-container d-flex align-items-start justify-content-start flex-column mx-4">
          <AppHeader className="text-capitalize my-3">
            Generate Images
          </AppHeader>
          <p className="text-muted">Generate any image using AI</p>
        </section>

        <section className="generation-area width-toggle-3 d-flex align-items-center justify-content-center mx-auto my-4 flex-column">
          <AppSearch
            onSubmit={(event: any) => {
              handleSubmit(event);
            }}
            inputProps={inputElementProps}
            placeholder="Enter an image generation term"
          ></AppSearch>

          <section className="search-result-container my-3 py-1">
            <p className="text-capitalize brand-white-text brand-small-text-2">
              search result for{' '}
              <span className="brand-primary-text fw-bold brand-small-text-2 text-capitalize">
                A robot in a car eating suya{' '}
              </span>
            </p>
          </section>

          <section className="image-collection-section d-flex align-items-center justify-content-center text-center">
            {!dataDonArrive && formSubmitted ? (
              <AppSpinner className={'d-flex'} />
            ) : (
              <></>
            )}
          </section>
          <section className="spacer my-3 py-3"></section>
          <AppImagePreview
            textPrompt="A robot in a car eating suya"
            imageSource={Logo}
          />
        </section>

        <section className="download-image-section d-flex align-items-center justify-content-center w-100 my-4">
          <AppButton className="brand-button-outline fw-bold width-toggle-6">
            Download Image
          </AppButton>
        </section>
      </AppLayout>
    </React.Fragment>
  );
};

export default Generator;
