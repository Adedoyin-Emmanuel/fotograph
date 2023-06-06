import CompressorContext from 'renderer/context/image-compresser-context';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import { retrieveFileExtension } from 'renderer/includes/scripts/customScript';
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
    console.log('from the provider file');
    console.log(files, fileCompressionLevel);
    if (files) {
      const updatedCompressionDetails = { ...contextValues.compressionDetails };

      files.forEach((file: File) => {
        const fileReader = new FileReader();

        fileReader.onload = async (event: any) => {
          const fileData = event.target.result;
          const values = {
            file: fileData,
            fileName: file.name,
            fileExtension: retrieveFileExtension(file.name),
            fileCompressionLevel: fileCompressionLevel,
          };
          console.log(values);
          window.electron.ipcRenderer.sendMessage('compress-image', values);
        };

        //  const newCompressionDetails = {
        //    size: Math.floor(Math.random() * 200 + 1),
        //    percentage: Math.floor(Math.random() * 100 + 1),
        //  };

        //  updatedCompressionDetails[file.name] = newCompressionDetails;

        //  setContextValues((prevContextValues: any) => ({
        //    ...prevContextValues,
        //    compressionDetails: updatedCompressionDetails,
        //    status: 200,
        //  }));

        fileReader.readAsArrayBuffer(file);
      });
    }
  }, [apiArguments]);

  return (
    <CompressorContext.Provider value={contextValues}>
      {children}
    </CompressorContext.Provider>
  );
};

export default CompressorProvider;
