import React from 'react';
import AppLayout from 'renderer/components/layouts/AppLayout';
import AppHeader from 'renderer/components/common/Header';
import AppButton from 'renderer/components/common/Button';
import $ from 'jquery';

const Generator = (): JSX.Element => {
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

        <section className="conversion-area"></section>
      </AppLayout>
    </React.Fragment>
  );
};

export default Generator;
