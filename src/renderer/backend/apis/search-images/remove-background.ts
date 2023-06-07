import Swal from 'sweetalert2';
import { retriveFileName } from 'renderer/includes/scripts/customScript';
import { CLIPDROP_API_KEY } from './remove-background-api-key';

 const removeUploadedFileBackground = (
  formData: FormData,
  filename: string
) => {
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

  fetch('https://clipdrop-api.co/remove-background/v1', {
    method: 'POST',
    headers: {
      'x-api-key': CLIPDROP_API_KEY,
    },
    body: formData,
  })
    .then((response) => {
      const contentType = response.headers.get('content-type');
      const extension = contentType?.split('/').pop() || 'png';

      return response.blob().then((blob) => {
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          `fotograph-${retriveFileName(filename)}-remove-bg.${extension}`
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        Swal.fire({
          toast: true,
          text: 'Background removed successfully',
          icon: 'success',
          timer: 4000,
          position: 'top-right',
          showConfirmButton: false,
        });
      });
    })
    .catch((error) => {
      Swal.fire({
        text: 'An error occurred while removing the background.',
        toast: true,
        timer: 4000,
        showConfirmButton: false,
        position: 'top-right',
        icon: 'error',
      });

      console.error(error);
      return false;
    });
};


export default removeUploadedFileBackground;
