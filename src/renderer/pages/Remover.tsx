import React, {
  DragEvent,
  useState,
  FormEvent,
  useContext,
  useEffect,
} from 'react';
import AppLayout from 'renderer/components/layouts/AppLayout';
import AppHeader from 'renderer/components/common/Header';
import AppButton from 'renderer/components/common/Button';
import AppFileDropZone from 'renderer/components/common/AppFileDropZone';
import BgRemoverProvider from 'renderer/providers/background-remover-provider';
import BgRemoverContext from 'renderer/context/background-remover-context';
import AppFileCollection from 'renderer/components/common/AppFileCollection';

const Remover = (): JSX.Element => {
  const [dragging, setDragging] = useState<boolean>(false);
  const [fileToRemoveBg, setFileToRemoveBg] = useState<any[]>();
  const [contextValues, setContextValues] = useState<any>({});
  const [allFilesContainer, setAllFilesContainer] = useState<any>([]);
  const [fileToSendToBgRemover, setFileToSendToBgRemover] = useState<any>({});

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
  const handleFileRemoval = (index: number, e: MouseEvent) => {
    fileToRemoveBg?.splice(index, 1);
    handleFileUpload(e);
    console.log(fileToRemoveBg);
    return e;
  };
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    handleFileUpload(e);
  };

  const handleRemoveBg = (e: any) => {
    const files = fileToRemoveBg;
    setFileToSendToBgRemover({ files });
  };
  useEffect(() => {
    setAllFilesContainer(
      fileToRemoveBg?.map((file: File, index: number) => {
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
  }, [fileToRemoveBg, contextValues]);

  const context = useContext(BgRemoverContext);

  useEffect(() => {
    if (context) {
      setContextValues(context);
    }
  }, [context]);
  return (
    <React.Fragment>
      <BgRemoverProvider
        apiArguments={fileToSendToBgRemover && fileToSendToBgRemover}
      >
        <AppLayout
          className="app-content-scroll app-content-flex flex-column"
          onRemoverPage={true}
        >
          <BgRemoverContext.Consumer>
            {(context) => {
              return (
                <>
                  <section className="convert-container d-flex align-items-start justify-content-start flex-column mx-4">
                    <AppHeader className="text-capitalize my-3">
                      Image background Remover
                    </AppHeader>
                    <p className="text-muted">
                      Remove the background of any image
                    </p>
                  </section>

                  <section className="conversion-area"></section>

                  <form
                    className="upload-button-section width-toggle-3 d-flex align-items-center m-auto flex-column"
                    encType="multipart/form-data"
                    id="conversion_form"
                    onChange={(e: FormEvent) => handleFileUpload(e)}
                    onSubmit={(e: FormEvent) => handleRemoveBg(e)}
                  >
                    <AppFileDropZone
                      handleDragEnter={handleDragEnter}
                      handleDragLeave={handleDragLeave}
                      handleDragOver={handleDragOver}
                      handleDrop={handleDrop}
                    />

                    <section className="spacer my-3 py-1"></section>

                    <React.Fragment>
                      {fileToRemoveBg && allFilesContainer}
                    </React.Fragment>
                    {fileToRemoveBg && (
                      <section className="submit-button-container w-100 d-flex align-items-start my-5">
                        <AppButton
                          className="width-toggle brand-small-text text-capitalize"
                          onClick={handleRemoveBg}
                        >
                          convert
                        </AppButton>
                      </section>
                    )}
                  </form>
                </>
              );
            }}
          </BgRemoverContext.Consumer>
        </AppLayout>
      </BgRemoverProvider>
    </React.Fragment>
  );
};

export default Remover;
