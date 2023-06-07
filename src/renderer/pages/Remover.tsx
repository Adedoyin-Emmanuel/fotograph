import React, { DragEvent, useState, FormEvent } from 'react';
import AppLayout from 'renderer/components/layouts/AppLayout';
import AppHeader from 'renderer/components/common/Header';
import AppButton from 'renderer/components/common/Button';
import AppFileDropZone from 'renderer/components/common/AppFileDropZone';

const Remover = (): JSX.Element => {
  const [dragging, setDragging] = useState<boolean>(false);
  const [fileToRemoveBg, setFileToRemoveBg] = useState<any[]>();

  const handleFileUpload = (e: any) => {
    e.preventDefault();
    if (e.dataTransfer?.files) {
      const files = e.dataTransfer?.files;
      const fileArray = [...files];
      setFileToRemoveBg(fileArray);
    } else {
      const files = e?.target.files || fileToRemoveBg;
      const fileArray = [...files];
      setFileToRemoveBg(fileArray);
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    handleFileUpload(e);
  };
  return (
    <React.Fragment>
      <AppLayout
        className="app-content-scroll app-content-flex flex-column"
        onRemoverPage={true}
      >
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
          onChange={(e: FormEvent) => handleFileUpload(e)}
        >
          <AppFileDropZone
            handleDragEnter={handleDragEnter}
            handleDragLeave={handleDragLeave}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
          />
        </form>
      </AppLayout>
    </React.Fragment>
  );
};

export default Remover;
