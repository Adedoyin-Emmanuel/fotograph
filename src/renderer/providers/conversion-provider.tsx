import ConversionContext from 'renderer/context/conversion-context';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import { Event } from 'electron';
interface ConversionProviderProps {
  children: JSX.Element[] | JSX.Element;
  apiArguments: any;
}

const ConversionProvider = ({
  children,
  apiArguments,
}: ConversionProviderProps) => {
  const [contextValues, setContextValues] = useState<any>(null);

  useEffect(() => {
    const { files, fileConversionFormat } = apiArguments;

    files &&
      files.forEach((file: File) => {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          const fileData = event.target.result;
          const values = {
            files: fileData,
            fileName: file.name,
            fileConversionFormat: fileConversionFormat,
          };
          window.electron.ipcRenderer.sendMessage('convert-images', values);
        };
        reader.readAsArrayBuffer(file);
      });

    window.electron.ipcRenderer.on(
      'conversion-successful',
      async (event: any, data: any) => {
        const { status, message, filePath } = await event;

        setContextValues({
          status: status,
        });

        Swal.fire({
          toast: true,
          text: message,
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
        const { status, message } = await event;

        setContextValues({
          status: status,
        });

        Swal.fire({
          toast: true,
          text: message,
          showConfirmButton: false,
          timer: 3000,
          icon: 'error',
          position: 'top-right',
        });
      }
    );
  }, [apiArguments]);

  return (
    <ConversionContext.Provider value={contextValues}>
      {children && children}
    </ConversionContext.Provider>
  );
};

export default ConversionProvider;
