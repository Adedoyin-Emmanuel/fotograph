import CompressorContext from 'renderer/context/image-compresser-context';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import {
  retrieveFileExtension,
  convertBytesToKb,
} from 'renderer/includes/scripts/customScript';
import db from 'renderer/backend/local-storage/db';
interface CompressorProviderProps {
  children: JSX.Element[] | JSX.Element;
  apiArguments: any;
}

const CompressorProvider = ({
  children,
  apiArguments,
}: CompressorProviderProps) => {
  const [contextValues, setContextValues] = useState<any>({
    compressionDetails: {},
  });

  useEffect(() => {
    const { fileArray: files, fileCompressionLevel } = apiArguments;

    if (files) {
      files.forEach((file: File) => {
        const fileReader = new FileReader();

        fileReader.onload = async (event: any) => {
          const fileData = event.target.result;
          const values = {
            file: fileData,
            fileName: file.name,
            fileExtension: retrieveFileExtension(file.name),
            fileCompressionLevel: fileCompressionLevel,
            initialFileSize: file.size,
          };
          window.electron.ipcRenderer.sendMessage('compress-image', values);
        };

        fileReader.readAsArrayBuffer(file);
      });
    }
  }, [apiArguments]);

  useEffect(() => {
    const compressImageSuccess = async (event: any, data: any) => {
      const { fileName, compressedSizeKb, initialFileSize } = await event;

      const newCompressionDetails = {
        size: Math.round(compressedSizeKb),
        percentage: calculateCompressionPercentage(
          convertBytesToKb(initialFileSize),
          compressedSizeKb
        ),
      };

      setContextValues((prevContextValues: any) => ({
        ...prevContextValues,
        compressionDetails: {
          ...prevContextValues.compressionDetails,
          [fileName]: newCompressionDetails,
        },
      }));

      Swal.fire({
        toast: true,
        text: 'Image compression successful',
        icon: 'success',
        timer: 3000,
        position: 'top-right',
        showConfirmButton: false,
      });
    };

    window.electron.ipcRenderer.on(
      'compress-image-success',
      compressImageSuccess
    );
  }, []);

  const calculateCompressionPercentage = (
    originalSize: number,
    compressedSize: number
  ) => {
    const percentage = ((originalSize - compressedSize) / originalSize) * 100;
    return Math.floor(percentage);
  };

  return (
    <CompressorContext.Provider value={contextValues}>
      {children}
    </CompressorContext.Provider>
  );
};

export default CompressorProvider;
