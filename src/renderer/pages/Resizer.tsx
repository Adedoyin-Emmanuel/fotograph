import React from 'react';
import AppLayout from 'renderer/components/layouts/AppLayout';
import AppHeader from 'renderer/components/common/Header';
import AppButton from 'renderer/components/common/Button';
import AppImageResizer from 'renderer/components/common/AppImageResizer';

const Resizer = (): JSX.Element => {
  return (
    <React.Fragment>
      <AppLayout
        className="app-content-scroll app-content-flex flex-column"
        onResizerPage={true}
      >
        <section className="convert-container d-flex align-items-start justify-content-start flex-column mx-4">
          <AppHeader className="text-capitalize my-3">Image Resizer</AppHeader>
          <p className="text-muted">Scale your images</p>
        </section>

          <AppImageResizer></AppImageResizer>

      </AppLayout>
    </React.Fragment>
  );
};

export default Resizer;
