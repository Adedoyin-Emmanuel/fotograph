import React, { useState } from 'react';
import JSZip from 'jszip';
import { useNavigate } from 'react-router-dom';
import {
  removeSymbols,
  checkStringLength,
} from 'renderer/includes/scripts/customScript';
import db from 'renderer/backend/local-storage/db';
interface AppCollectionPackProps {
  title?: string | any;
  total: number;
  previewPhotoOne?: string;
  previewPhotoTwo?: string;
  previewPhotoThree?: string;
  user?: string | any;
  id?: number | string;
  altDescription?: string;
  coverPhotoId?: string;
  onDownloadButtonClick?: () => void;
}

const AppCollectionPack = ({
  title,
  total,
  previewPhotoOne,
  previewPhotoTwo,
  previewPhotoThree,
  user,
  id,
  altDescription,
  coverPhotoId,
  onDownloadButtonClick,
}: AppCollectionPackProps) => {
  const navigateTo = useNavigate();

  const handleViewImageClick = (): void => {
    /* We would add this update later */
    //navigateTo(`${id}?${total}`);
    db.create('FOTOGRAPH_IMAGE_TITLE', title);
    db.create('FOTOGRAPH_IMAGE_USER', user);
  };

  const handleDownloadClick = () => {};

  return (
    <React.Fragment>
      <section className="container-fluid mt-5">
        <section className="card shadow">
          <section
            id={`${removeSymbols(coverPhotoId)}`}
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <section className="carousel-indicators">
              <button
                type="button"
                data-bs-target={`#${removeSymbols(coverPhotoId)}`}
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target={`#${removeSymbols(coverPhotoId)}`}
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target={`#${removeSymbols(coverPhotoId)}`}
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </section>

            {total > 2 && (
              <section className="carousel-inner shadow-sm">
                <section className="carousel-item active">
                  <img
                    src={previewPhotoOne}
                    alt={altDescription}
                    className="d-block w-100"
                  />
                </section>
                <section className="carousel-item shadow-sm">
                  <img
                    src={previewPhotoTwo}
                    alt={`photo relating to ${title}`}
                    className="d-block w-100"
                  />
                </section>
                <section className="carousel-item shadow-sm">
                  <img
                    src={previewPhotoThree}
                    alt={`photo relating to ${title}`}
                    className="d-block w-100"
                  />
                </section>
              </section>
            )}

            {total == 2 && (
              <section className="carousel-inner shadow-sm">
                <section className="carousel-item active">
                  <img
                    src={previewPhotoOne}
                    alt={altDescription}
                    className="d-block w-100"
                  />
                </section>
                <section className="carousel-item shadow-sm">
                  <img
                    src={previewPhotoTwo}
                    alt={`photo relating to ${title}`}
                    className="d-block w-100"
                  />
                </section>
              </section>
            )}

            {total == 1 && (
              <section className="carousel-inner shadow-sm">
                <section className="carousel-item active">
                  <img
                    src={previewPhotoOne}
                    alt={altDescription}
                    className="d-block w-100"
                  />
                </section>
              </section>
            )}

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target={`#${removeSymbols(coverPhotoId)}`}
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target={`#${removeSymbols(coverPhotoId)}`}
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
            <p className="text-capitalize text-center brand-small-text my-2 fw-bold">
              {checkStringLength(title)}
            </p>
            <p className="text-capitalize text-center brand-small-text-2 my-2">
              {total} {total > 1 ? 'images' : 'image'}
            </p>
          </section>

          <section className="d-flex justify-content-around mt-3 my-2">
            <button
              className="p-1 px-2 rounded brand-download-image-btn brand-small-text-2 shadow-sm"
              onClick={onDownloadButtonClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                fill="currentColor"
                className="bi bi-download"
                viewBox="0 0 16 16"
              >
                <path d="M7.5 1v9.793l-3.646-3.647a.5.5 0 0 0-.708.708l4 4a.5.5 0 0 0 .708 0l4-4a.5.5 0 0 0-.708-.708L8.5 10.793V1a.5.5 0 0 0-1 0z" />
                <path d="M14.5 13.5v1a.5.5 0 0 1-.5.5h-12a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 .5.5z" />
              </svg>{' '}
              Download
            </button>
            <button
              type="button"
              className="p-1 px-2 rounded brand-small-text-2 text-capitalize brand-view-image-btn"
              onClick={handleViewImageClick}
            >
              view images
            </button>
          </section>
        </section>
      </section>
    </React.Fragment>
  );
};

export default AppCollectionPack;
