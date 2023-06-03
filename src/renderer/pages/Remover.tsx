import React from 'react';
import AppLayout from 'renderer/components/layouts/AppLayout';
import AppHeader from 'renderer/components/common/Header';
import AppButton from 'renderer/components/common/Button';
import AppFileDropZone from 'renderer/components/common/AppFileDropZone';

const Remover = (): JSX.Element => {
  return (
    <React.Fragment>
      <AppLayout className="app-content-scroll app-content-flex flex-column" onRemoverPage={true}>
        <section className="convert-container d-flex align-items-start justify-content-start flex-column mx-4">
          <AppHeader className="text-capitalize my-3">
            Image background Remover
          </AppHeader>
          <p className="text-muted">Remove the background of any image</p>
        </section>

        <section className="conversion-area"></section>

        <form
          className="upload-button-section width-toggle-3 d-flex align-items-center m-auto"
          id="conversion_form"
          encType="multipart/form-data"
        >
        <AppFileDropZone/>

        </form>
      </AppLayout>
    </React.Fragment>
  );
};

export default Remover;
