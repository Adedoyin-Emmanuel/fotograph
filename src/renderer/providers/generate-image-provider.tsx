import GenerateImageContext from 'renderer/context/generate-image-context';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';

interface GenerateImageProps {
  children: JSX.Element[] | JSX.Element;
  apiArguments: any;
}

const GenerateImageProvider = ({
  children,
  apiArguments,
}: GenerateImageProps) => {
  const [contextValues, setContextValues] = useState<any>(null);

  useEffect(() => {}, [apiArguments]);

  return (
    <GenerateImageContext.Provider value={contextValues}>
      {children && children}
    </GenerateImageContext.Provider>
  );
};

export default GenerateImageProvider;
