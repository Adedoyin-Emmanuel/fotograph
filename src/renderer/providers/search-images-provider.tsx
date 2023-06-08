import SearchImageContext from 'renderer/context/search-images-context';
import {
  fetchImages,
  fetchImages2,
  fetchImages3,
} from 'renderer/backend/apis/search-images/search-images';
import { useState, useEffect } from 'react';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { checkIfOnline } from 'renderer/includes/scripts/customScript';
interface SearchImagesProviderProps {
  children: JSX.Element | JSX.Element[];
  apiArguments: any;
}

const SearchImagesProvider = ({
  children,
  apiArguments,
}: SearchImagesProviderProps) => {
  const [contextValues, setContextValues] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!checkIfOnline()) {
        Swal.fire({
          toast: true,
          text: 'No Internet connection!',
          icon: 'warning',
          showConfirmButton: false,
          position: 'top-right',
          timer: 3000,
        }).then((willProceed: SweetAlertResult<any>) => {
          Swal.fire({
            toast: true,
            text: 'Connect and try again!',
            icon: 'info',
            showConfirmButton: false,
            position: 'top-right',
            timer: 3000,
          });
        });
      }
      try {
        /*fetch the images from the 3 API's UNSPLASH, PIXABAY and PEXELS*/
        if (apiArguments.length >= 1) {
          const result = await fetchImages(apiArguments);
          const result2 = await fetchImages2(apiArguments);
          const result3 = await fetchImages3(apiArguments);
          setContextValues({ result, result2, result3 });
        }
      } catch (error: any) {
        console.error('Error fetching images:', error);
        if (apiArguments !== '') {
          Swal.fire({
            toast: true,
            text: 'Error fetching images',
            icon: 'error',
            showConfirmButton: false,
            position: 'top-right',
            timer: 3000,
          });
        }
      }
    };

    fetchData();
  }, [apiArguments]);

  return (
    <SearchImageContext.Provider value={contextValues}>
      {children}
    </SearchImageContext.Provider>
  );
};

export default SearchImagesProvider;
