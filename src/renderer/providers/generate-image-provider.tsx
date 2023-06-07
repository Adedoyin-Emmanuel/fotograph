import GenerateImageContext from 'renderer/context/generate-image-context';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import generateImages from 'renderer/backend/apis/search-images/generate-images';

interface GenerateImageProps {
  children: JSX.Element[] | JSX.Element;
  apiArguments: any;
}

const GenerateImageProvider = ({
  children,
  apiArguments,
}: GenerateImageProps) => {
  const [contextValues, setContextValues] = useState<any>(null);

  useEffect(() => {
    const { searchTerm } = apiArguments;

    const fetchData = async () => {
      if (searchTerm) {
        const formData = new FormData();
        console.log(searchTerm);
        formData.append('prompt', searchTerm);

        try {
          const result = await generateImages(formData);
          console.log(result);
          setContextValues({ result });
        } catch (error) {
          Swal.fire({
            text: 'An error occurred while generating image.',
            toast: true,
            timer: 4000,
            showConfirmButton: false,
            position: 'top-right',
            icon: 'error',
          });

          console.error(error);
          setContextValues({ error });
        }
      }
    };

    fetchData();
  }, [apiArguments]);

  return (
    <GenerateImageContext.Provider value={contextValues}>
      {children && children}
    </GenerateImageContext.Provider>
  );
};

export default GenerateImageProvider;
