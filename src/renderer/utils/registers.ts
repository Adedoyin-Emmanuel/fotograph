import Swal from 'sweetalert2';
import getOnboardingScreenConfigValue from './onboardingScreenConfig';

const registerOnboardingScreen = () => {
  const value = getOnboardingScreenConfigValue();

  value.then((response) => {
    if (!response) {
      Swal.fire({
        title: '<h4 class="text-start fw-bold text-capitalize">fotograph</h4>',
        html: `
      <section class="text-muted text-start brand-small-text my-2">
        FotoGraph is an innovative image manipulation software designed to enhance your development workflow.
      </section>
    `,
        confirmButtonText: 'Proceed',
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((willProceed: any) => {
        if (willProceed.isConfirmed) {
          Swal.fire({
            title:
              '<h4 class="text-start fw-bold text-capitalize">Features</h4>',
            html: `
      <section class="text-muted text-start brand-small-text my-2">
       FotoGraph is a powerful image manipulation software with a variety of tools for image conversion, bulk image downloading, AI-based image generation, background removal, image resizing, and compression.
      </section>
    `,
            confirmButtonText: 'Finish',
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then((willProceed: any) => {
            if (willProceed.isConfirmed) {
              window.electron.ipcRenderer.sendMessage('set-storage', {
                onBoardingScreenSeen: true,
              });
            }
          });
        }
      });
    } else {
      return;
    }
  });
};

export default registerOnboardingScreen;
