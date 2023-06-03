import React, { useState, DragEvent, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

interface AppFileDropZoneProps {
  handleDragEnter: (e: DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: DragEvent<HTMLDivElement>) => void;
  handleDragOver: (e: DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: DragEvent<HTMLDivElement>) => void;
}

const AppFileDropZone = ({
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  handleDrop,
}: AppFileDropZoneProps): JSX.Element => {
  return (
    <React.Fragment>
      <section
        className={`app-file-drop-zone p-5 d-flex align-items-center justify-content-around w-100 rounded-3 `}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <section className="drop-zone-content my-5 d-flex align-items-center justify-content-center flex-column ">
          <FontAwesomeIcon
            icon={faCloudArrowUp}
            className=""
            color="white"
            size="2x"
          />
          <section className="file-zone-text my-3">
            <label className="brand-text-primary-color text-center brand-small-text click-to-upload">
              <input
                type="file"
                id="file_uploaded"
                name="files"
                className=""
                hidden
                multiple
              />
              Click to upload
            </label>{' '}
            <span className="brand-small-text text-light">
              or drag and drop
            </span>
          </section>
        </section>
      </section>
    </React.Fragment>
  );
};

export default AppFileDropZone;
