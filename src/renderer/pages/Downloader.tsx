import React, { useState, useRef } from 'react';
import AppLayout from 'renderer/components/layouts/AppLayout';
import AppHeader from 'renderer/components/common/Header';
import AppSearch from 'renderer/components/common/AppSearch';
import AppSpinner from 'renderer/components/common/Spinner';
import {
  fetchImages,
  fetchImages2,
  fetchImages3,
} from 'renderer/backend/apis/search-images/search-images';
import AppBackToTop from 'renderer/components/common/BackToTop';
import SearchImagesProvider from 'renderer/providers/search-images-provider';
import SearchImageContext from 'renderer/context/search-images-context';
import {
  ImageCollection,
  ImageCollection2,
  ImageCollection3,
} from 'renderer/components/common/AppImageCollections';
import db from 'renderer/backend/local-storage/db';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Downloader = (): JSX.Element => {
  const searchInputRef = useRef<any>(null);
  const [dataDonArrive, setDataDonArrive] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [userSearchInput, setUserSearchInput] = useState<string>('');
  const inputElementProps = {
    autoComplete: 'off',
    ref: searchInputRef,
  };

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    searchInputRef.current.blur();
    setFormSubmitted(true);
    setTimeout(async () => {
      try {
        let searchResult = await fetchImages(e.target[0].value);
        let searchResult2 = await fetchImages2(e.target[0].value);
        let searchResult3 = await fetchImages3(e.target[0].value);
        let totalImagesCollection =
          searchResult.total +
          searchResult2.total +
          searchResult3.total_results;
        let totalImagesPages =
          searchResult.total_pages +
          searchResult2.totalHits +
          searchResult3.per_page;
        setUserSearchInput(e.target[0].value);
        db.create('FOTOGRAPH_SEARCH_ITEM', e.target[0].value);
        db.create('FOTOGRAPH_TOTAL_SEARCH_IMAGES', totalImagesCollection);
        db.create('FOTOGRAPH_TOTAL_SEARCH_PAGES', totalImagesPages);
        searchInputRef.current.blur();
        setDataDonArrive(true);
      } catch (error: any) {
        if (error.statusText == 'error') {
          Swal.fire({
            toast: true,
            text: 'An error occured',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
            position: 'top',
          }).then((willProceed) => {
            Swal.fire({
              toast: true,
              text: 'Try again :)',
              icon: 'info',
              showConfirmButton: false,
              timer: 3000,
              position: 'top',
            });
          });
        }
      }
    }, 0);
  };

  const mapImages = (context: any) => {
    return (
      <section className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {dataDonArrive && <ImageCollection results={context?.result.results} />}
        <br />
        <br />
        <section className="spacer my-3 py-4"></section>
      </section>
    );
  };

  const mapImages2 = (context: any) => {
    return (
      <section className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {dataDonArrive && <ImageCollection2 results={context?.result2} />}
        <br />
        <br />
        <section className="spacer my-3 py-4"></section>
      </section>
    );
  };

  const mapImages3 = (context: any) => {
    return (
      <section className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {dataDonArrive && <ImageCollection3 results={context?.result3} />}
        <br />
        <br />
        <section className="spacer my-3 py-4"></section>
      </section>
    );
  };

  const mapImageContainer = [mapImages, mapImages2, mapImages3];

  let [counter, setCounter] = useState<number>(0);

  return (
    <SearchImagesProvider apiArguments={userSearchInput}>
      <AppLayout
        className="app-content-scroll app-content-flex flex-column"
        onDownloadPage={true}
      >
        {dataDonArrive ? <AppBackToTop /> : <></>}

        <SearchImageContext.Consumer>
          {(context) => {
            return (
              <React.Fragment>
                <section className="convert-container d-flex align-items-start justify-content-start flex-column mx-4">
                  <AppHeader className="text-capitalize my-3">
                    Search and Download
                  </AppHeader>
                  <p className="text-muted">
                    Search and download multiple images
                  </p>
                </section>

                <section className="search-area width-toggle-3 d-flex align-items-center justify-content-center mx-auto my-4">
                  <AppSearch
                    onSubmit={(FormData: any) => {
                      handleSubmit(FormData);
                    }}
                    inputProps={inputElementProps}
                  ></AppSearch>
                </section>
                <section className="search-result w-100 d-flex align-items-center justify-content-center">
                  {dataDonArrive && (
                    <p className="text-capitalize brand-small-text mx-2 text-light px-2 text-center">
                      search results for{' '}
                      <span
                        className="brand-primary-text fw-bold"
                        id="searchTerm"
                      >
                        {userSearchInput}
                      </span>{' '}
                      <span className="brand-small-text-2 text-center">
                        {db.get('FOTOGRAPH_TOTAL_SEARCH_IMAGES')}{' '}
                        {parseInt(db.get('FOTOGRAPH_TOTAL_SEARCH_IMAGES')) > 1
                          ? 'images'
                          : 'image'}
                      </span>
                    </p>
                  )}
                </section>
                <section className="pagination-container mx-5">
                  {dataDonArrive && (
                    <section className="d-flex align-items-center justify-content-between">
                      {counter > 0 && (
                        <FontAwesomeIcon
                          icon={faArrowLeft}
                          color={'#48cae4'}
                          className="mx-5 pagination-icon"
                          size={'lg'}
                          onClick={() => setCounter((counter -= 1))}
                        ></FontAwesomeIcon>
                      )}
                      {counter <= 2 && (
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          color="#48cae4"
                          className="mx-5 pagination-icon"
                          size={'lg'}
                          onClick={() => {
                            counter == 2
                              ? setCounter(0)
                              : setCounter((counter += 1));
                          }}
                        ></FontAwesomeIcon>
                      )}
                    </section>
                  )}
                </section>
                <section className="image-collection-section d-flex align-items-center justify-content-center text-center">
                  {!dataDonArrive && formSubmitted ? (
                    <AppSpinner className={'d-flex'} />
                  ) : (
                    <></>
                  )}
                </section>

                <section className="container">
                  {context && mapImageContainer[counter](context)}
                </section>
                <br />
                <br />
                <section className="pagination-container m-auto">
                  {dataDonArrive && (
                    <section className="d-flex align-items-center justify-content-between">
                      {counter > 0 && (
                        <FontAwesomeIcon
                          icon={faArrowLeft}
                          color={'#48cae4'}
                          className="mx-5 pagination-icon"
                          size={'lg'}
                          onClick={() => setCounter((counter -= 1))}
                        ></FontAwesomeIcon>
                      )}
                      {counter <= 2 && (
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          color="#48cae4"
                          className="mx-5 pagination-icon"
                          size={'lg'}
                          onClick={() => {
                            counter == 2
                              ? setCounter(0)
                              : setCounter((counter += 1));
                          }}
                        ></FontAwesomeIcon>
                      )}
                    </section>
                  )}
                </section>
                <section className="spacer my-3 py-4"></section>
              </React.Fragment>
            );
          }}
        </SearchImageContext.Consumer>
      </AppLayout>
    </SearchImagesProvider>
  );
};

export default Downloader;
