import React, {
  FormEvent,
  useRef,
  useState,
  useContext,
  useEffect,
} from 'react';
import AppLayout from 'renderer/components/layouts/AppLayout';
import AppHeader from 'renderer/components/common/Header';
import AppButton from 'renderer/components/common/Button';
import $ from 'jquery';
import AppSearch from 'renderer/components/common/AppSearch';
import AppSpinner from 'renderer/components/common/Spinner';
import AppImagePreview from 'renderer/components/common/AppImagePreview';
import Logo from './../../../assets/icon.png';
import GenerateImageContext from 'renderer/context/generate-image-context';
import GenerateImageProvider from 'renderer/providers/generate-image-provider';
import { setData } from '../backend/apis/electron-storage/db';
import db from 'renderer/backend/local-storage/db';
const Generator = (): JSX.Element => {
  const searchInputRef = useRef<any>(null);
  const [dataDonArrive, setDataDonArrive] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [contextValues, setContextValues] = useState<any>(null);
  const [searchPrompt, setSearchPrompt] = useState<any>({});
  const [generatedImageResult, setGeneratedImageResult] = useState<any>(null);
  const inputElementProps = {
    autoComplete: 'off',
    ref: searchInputRef,
  };

  const handleSubmit = (event: FormEvent | any) => {
    event.preventDefault();
    const searchTerm = event.target[0].value;
    db.create('FOTOGRAPH_TEMP_SEARCH_TERM', searchTerm);
    setFormSubmitted(true);
    setSearchPrompt({
      searchTerm: searchTerm,
    });
  };

  useEffect(() => {
    contextValues &&
      setGeneratedImageResult(
        <AppImagePreview
          textPrompt={db.get('FOTOGRAPH_TEMP_SEARCH_TERM')}
          imageSource={contextValues?.result}
        />
      );
    setDataDonArrive(true);
    setFormSubmitted(false);
  }, [dataDonArrive, contextValues]);

  const handleDownloadButtonClick = () => {
    if (contextValues) {
      const link = document.createElement('a');
      link.href = contextValues.result;
      link.download = `${db.get('FOTOGRAPH_TEMP_SEARCH_TERM')}.jpg`;
      link.click();
    }
  };

  return (
    <React.Fragment>
      <GenerateImageProvider apiArguments={searchPrompt && searchPrompt}>
        <AppLayout
          className="app-content-scroll app-content-flex flex-column"
          onGeneratorPage={true}
        >
          <GenerateImageContext.Consumer>
            {(context) => {
              context && setContextValues(context);
              return (
                <>
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

                    {context && (
                      <section className="search-result-container my-3 py-1">
                        <p className="text-capitalize brand-white-text brand-small-text-2">
                          search result for{' '}
                          <span className="brand-primary-text fw-bold brand-small-text-2 text-capitalize">
                            {db.get('FOTOGRAPH_TEMP_SEARCH_TERM')}{' '}
                          </span>
                        </p>
                      </section>
                    )}
                    <section className="image-collection-section d-flex align-items-center justify-content-center text-center">
                      {formSubmitted ? (
                        <AppSpinner className={'d-flex'} />
                      ) : (
                        <></>
                      )}
                    </section>
                    <section className="spacer my-3 py-3"></section>
                    {generatedImageResult && generatedImageResult}
                  </section>

                  {context && (
                    <section className="download-image-section d-flex align-items-center justify-content-center w-100 my-4">
                      <AppButton
                        className="brand-button-outline fw-bold width-toggle-6"
                        onClick={handleDownloadButtonClick}
                      >
                        Download Image
                      </AppButton>
                    </section>
                  )}
                </>
              );
            }}
          </GenerateImageContext.Consumer>
        </AppLayout>
      </GenerateImageProvider>
    </React.Fragment>
  );
};

export default Generator;
