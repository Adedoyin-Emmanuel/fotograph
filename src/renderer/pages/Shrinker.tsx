import React from 'react';
import AppLayout from 'renderer/components/layouts/AppLayout';
import AppHeader from 'renderer/components/common/Header';
import AppButton from 'renderer/components/common/Button';

const Shrinker = (): JSX.Element => {
  return (
    <React.Fragment>
      <AppLayout className="app-content-scroll app-content-flex flex-column" onShrinkerPage={true}>
        <section className="convert-container d-flex align-items-start justify-content-start flex-column mx-4">
          <AppHeader className="text-capitalize my-3">Image size reducer</AppHeader>
          <p className="text-muted">Reduce an image size</p>
        </section>

        <section className="conversion-area"></section>
      </AppLayout>
    </React.Fragment>
  );
};

export default Shrinker;
