import React, {
  FormEvent,
  useState,
  useEffect,
  useContext,
  DragEvent,
} from 'react';
import AppLayout from 'renderer/components/layouts/AppLayout';
import AppHeader from 'renderer/components/common/Header';
import AppButton from 'renderer/components/common/Button';
import AppFileDropZone from 'renderer/components/common/AppFileDropZone';
import ConversionContext from 'renderer/context/conversion-context';
import ConversionProvider from 'renderer/providers/conversion-provider';
import AppFileCollection from 'renderer/components/common/AppFileCollection';
import AppConvertToButton from 'renderer/components/common/AppConvertToButton';
import * as utils from './../includes/scripts/customScript';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import db from 'renderer/backend/local-storage/db';
import Swal from 'sweetalert2';

const Converter = (): JSX.Element => {
  const [fileToConvert, setFileToConvert] = useState<any[]>();
  const [fileToSendToConverter, setFileToSendToConverter] = useState<any>({});
  const [allFilesContainer, setAllFilesContainer] = useState<any>([]);
  const [fileConversionStatus, setFileConversionStatus] = useState<number>(0);
  const [contextValues, setContextValues] = useState<any>({});
  const [dragging, setDragging] = useState<boolean>(false);

  const handleFileUpload = (e: any) => {
    e.preventDefault();
    if (e.dataTransfer?.files) {
      const files = e.dataTransfer?.files;
      const fileArray = [...files];
      setFileToConvert(fileArray);
    } else {
      const files = e?.target.files || fileToConvert;
      const fileArray = [...files];
      setFileToConvert(fileArray);
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

  const handleConvert = (e: any) => {
    const files = fileToConvert;
    const fileConversionFormat = e.target.form[1].value;
    console.log(files, fileConversionFormat);
    setFileToSendToConverter({ files, fileConversionFormat });
  };

  const handleFileRemoval = (index: number, e: MouseEvent) => {
    fileToConvert?.splice(index, 1);
    handleFileUpload(e);
    console.log(fileToConvert);
    return e;
  };

  useEffect(() => {
    setAllFilesContainer(
      fileToConvert?.map((file: File, index: number) => {
        return (
          <AppFileCollection
            key={index}
            className="my-2"
            fileName={file.name}
            fileSize={file.size}
            onCancel={(e: MouseEvent) => handleFileRemoval(index, e)}
            conversionStatus={contextValues.status}
          />
        );
      })
    );
  }, [fileToConvert, contextValues]);

  const context = useContext(ConversionContext);

  useEffect(() => {
    if (context) {
      setContextValues(context);
    }
  }, [context]);

  return (
    <ConversionProvider
      apiArguments={fileToSendToConverter && fileToSendToConverter}
    >
      <AppLayout
        className="app-content-scroll app-content-flex flex-column"
        onConverterPage={true}
      >
        <ConversionContext.Consumer>
          {(context) => {
            context && setContextValues(context);

            return (
              <>
                <section className="convert-container d-flex align-items-start justify-content-start flex-column mx-4">
                  <AppHeader className="text-capitalize my-3">
                    Image converter
                  </AppHeader>
                  <p className="text-muted">
                    Convert your image files to any format
                  </p>
                </section>

                <form
                  className="upload-button-section width-toggle-3 d-flex align-items-center m-auto flex-column"
                  encType="multipart/form-data"
                  id="conversion_form"
                  onChange={(e: FormEvent) => handleFileUpload(e)}
                  onSubmit={(e: FormEvent) => handleConvert(e)}
                >
                  <AppFileDropZone
                    handleDragEnter={handleDragEnter}
                    handleDragLeave={handleDragLeave}
                    handleDragOver={handleDragOver}
                    handleDrop={handleDrop}
                  />

                  {fileToConvert && (
                    <section className="app-convert-to-container d-flex align-items-start w-100 my-3">
                      <AppConvertToButton
                        values={[
                          'Png',
                          'Webp',
                          'Gif',
                          'Jpeg',
                          'Jpg',
                          'Ico',
                          'Aivf',
                          'Tiff',
                        ]}
                      />
                    </section>
                  )}
                  <React.Fragment>
                    {fileToConvert && allFilesContainer}
                  </React.Fragment>
                  {fileToConvert && (
                    <section className="submit-button-container w-100 d-flex align-items-start my-5">
                      <AppButton
                        className="width-toggle brand-small-text text-capitalize"
                        onClick={handleConvert}
                      >
                        convert
                      </AppButton>
                    </section>
                  )}
                </form>
              </>
            );
          }}
        </ConversionContext.Consumer>
      </AppLayout>
    </ConversionProvider>
  );
};

export default Converter;
