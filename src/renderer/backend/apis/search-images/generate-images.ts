import Swal from 'sweetalert2';
import { CLIPDROP_API_KEY } from './remove-background-api-key';

const generateImages = async (formData: FormData) => {
  if (!navigator.onLine) {
    Swal.fire({
      toast: true,
      timer: 4000,
      text: 'No internet connection',
      icon: 'error',
      showConfirmButton: false,
      position: 'top',
    });
    return false;
  }
  try {
    const response = await fetch('https://clipdrop-api.co/text-to-image/v1', {
      method: 'POST',
      headers: {
        'x-api-key': CLIPDROP_API_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('An error occurred while generating image.');
    }

    const buffer = await response.arrayBuffer();
    const blob = new Blob([buffer], { type: 'image/png' });
    const imageUrl = URL.createObjectURL(blob);

    return imageUrl;
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
    return false;
  }
};

export default generateImages;
