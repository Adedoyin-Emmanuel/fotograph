import CompressorContext from 'renderer/context/image-compresser-context';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';

interface CompressorProviderProps {
  children: JSX.Element[] | JSX.Element;
  apiArguments: any;
}

const CompressorProvider = ({
  children,
  apiArguments,
}: CompressorProviderProps) => {
  const [contextValues, setContextValues] = useState<any>(null);

  useEffect(() => {
    const { files, fileName } = apiArguments;

    files &&
      files.forEach((file: File) => {
        const fileReader = new FileReader();

        fileReader.onload = (event: any) => {
          const fileData = event.target.result;
          const values = {
            file: fileData,
            fileName: file.name,
          };

          window.electron.ipcRenderer.sendMessage('reduce-image-size', values);
        };
        fileReader.readAsDataURL(file);
      });

    window.electron.ipcRenderer.on(
      'image-compress-success',
      async (event: any, data) => {
        const {
          originalFileName,
          originalFileSize,
          reducedFileSize,
          filePath,
        } = await event;
        setContextValues({
          status: 200,
          originalFileName: originalFileName,
          originalFileSize: originalFileSize,
          reducedFileSize: reducedFileSize,
        });

        Swal.fire({
          toast: true,
          text: 'Image compressed successfully',
          showConfirmButton: false,
          timer: 3000,
          icon: 'success',
          position: 'top-right',
        }).then((willProceed) => {
          window.electron.ipcRenderer.sendMessage('show-dialog', filePath);
        });
      }
    );

    window.electron.ipcRenderer.on(
      'conversion-failed',
      async (event: any, data: any) => {
        setContextValues({
          status: 500,
        });

        Swal.fire({
          toast: true,
          text: 'Image compression failed!',
          showConfirmButton: false,
          timer: 3000,
          icon: 'error',
          position: 'top-right',
        });
      }
    );
  }, [apiArguments]);

  return (
    <CompressorContext.Provider value={contextValues}>
      {children && children}
    </CompressorContext.Provider>
  );
};

export default CompressorProvider;
