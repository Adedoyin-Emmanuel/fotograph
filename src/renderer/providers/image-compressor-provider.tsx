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
  const [contextValues, setContextValues] = useState<any>({
    compressionDetails: {},
  });

  useEffect(() => {
    const { files } = apiArguments;

    if (files) {
      const updatedCompressionDetails = { ...contextValues.compressionDetails };

      files.forEach((file: File) => {
        const fileReader = new FileReader();

        fileReader.onload = (event: any) => {
          const fileData = event.target.result;
          console.log(file.size);
          const newCompressionDetails = {
            size: Math.floor(Math.random() * 200 + 1),
            percentage: Math.floor(Math.random() * 100 + 1),
          };

          updatedCompressionDetails[file.name] = newCompressionDetails;

          setContextValues((prevContextValues: any) => ({
            ...prevContextValues,
            compressionDetails: updatedCompressionDetails,
            status: 200,
          }));
        };

        fileReader.readAsDataURL(file);
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
