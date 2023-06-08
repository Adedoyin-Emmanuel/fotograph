import $, { data } from 'jquery';
import JSZip from 'jszip';
import Swal from 'sweetalert2';
import saveAs from 'file-saver';
import * as SEARCH_API from './search-images-api-key';
import db from 'renderer/backend/local-storage/db';
interface fetchImagesProp {
  searchData?: any;
}

let safeSearch = db.get('FOTOGRAPH_SAFE_SEARCH_VALUE') == 'true' ? true : false;
let maxNumberOfDownloads =
  parseInt(db.get('FOTOGRAPH_MAX_DOWNLOAD_PICTURES')) || 0;

/* Fetching Images from the Unsplash API */
export const fetchImages = (searchData: fetchImagesProp) => {
  return $.ajax({
    url: `https://api.unsplash.com/search/collections/?per_page=20&client_id=${SEARCH_API.UNSPLASH_API_KEY}&query=${searchData}`,
    processData: false,
    contentType: false,
  });
};

/* Fetching Images from the Pixabay API */
export const fetchImages2 = (searchData: fetchImagesProp) => {
  return $.ajax({
    url: `https://pixabay.com/api/?key=${SEARCH_API.PIXABAY_API_KEY}&q=${searchData}&per_page=20&safesearch=${safeSearch}`,
    processData: false,
    contentType: false,
  });
};

/* Fetching Images from the Pexels API */
export const fetchImages3 = (searchData: fetchImagesProp) => {
  return $.ajax({
    url: `https://api.pexels.com/v1/search?query=${searchData}&per_page=20`,
    processData: false,
    contentType: false,
    headers: {
      Authorization: SEARCH_API.PEXEL_API_KEY,
    },
  });
};

export interface HandleImageDownloadProps {
  id: number | string;
  total: number;
  perPage: number;
  title: string;
  user: string;
}

let images: any = [];
let page = 1;

export const handleImageDownload = (
  id: number | string,
  total: number,
  perPage: number | string,
  title: string,
  user: string,
  source: number
) => {
  let totalImages = total; /*settings for user to limit bulk download*/
  if (total > maxNumberOfDownloads && maxNumberOfDownloads > 0) {
    totalImages = maxNumberOfDownloads;
  } else {
    totalImages = total;
  }

  let apiSource = source;
  let url = ``;
  let headers = {};
  switch (apiSource) {
    case 0 /*fetch the data from unsplash API*/:
      url = `https://api.unsplash.com/collections/${id}/photos?client_id=${SEARCH_API.UNSPLASH_API_KEY}&page=${page}&per_page=${perPage}`;
      break;

    case 1 /*fetch the data from the pixabay API*/:
      url = `https://pixabay.com/api/?key=${
        SEARCH_API.PIXABAY_API_KEY
      }&q=${db.get('FOTOGRAPH_SEARCH_ITEM')}&per_page=${perPage}&page=${page}`;

      break;

    case 2 /*fetch the data from the pexels API*/:
      url = `https://api.pexels.com/v1/search?query=${db.get(
        'FOTOGRAPH_SEARCH_ITEM'
      )}&per_page=${perPage}&page=${page}`;
      headers = {
        Authorization: SEARCH_API.PEXEL_API_KEY,
      };
  }
  $.ajax({
    url: url,
    processData: false,
    contentType: false,
    headers: Object.keys(headers).length
      ? headers
      : undefined /*Include headers only if they are defined */,
    success: (data: any) => {
      let customData = undefined;
      switch (apiSource) {
        case 0:
          customData = data;
          break;
        case 1:
          customData = data.hits;
          break;
        case 2:
          customData = data.photos;
          break;

        default:
          customData = data;
      }

      images.push(...customData);
      console.log(totalImages);
      console.log(images.length);
      if (images.length == totalImages) {
        //alert the user the download would start soon
        window.electron.ipcRenderer.sendMessage('show-notification', {
          title: 'Download',
          text: 'Download starting soon!',
          type: 'success',
        });

        Swal.fire({
          toast: true,
          text: `Don't leave this page`,
          icon: 'info',
          showConfirmButton: false,
          position: 'top-right',
          timer: 3000,
        });

        const zip = new JSZip();
        let photoZip = zip.folder(`${title} by ${user}`);
        const promises = <any>[];
        let imageUrl = undefined;
        for (let i = 0; i < images.length; i++) {
          switch (apiSource) {
            case 0:
              imageUrl = images[i].urls.regular;
              break;

            case 1:
              imageUrl = images[i].webformatURL;
              break;

            case 2:
              imageUrl = images[i].src.medium;
              break;

            default:
              imageUrl = images[i].urls.regular;
          }
          const promise = fetch(imageUrl)
            .then((response) => response.blob())
            .then((blob) => {
              photoZip?.file(`${title + [i]}.jpg`, blob);
              promises.push(promise);
              if (promises.length == images.length) {
                Promise.all(promises).then(() => {
                  zip.generateAsync({ type: 'blob' }).then((content) => {
                    saveAs(content, `${title} by ${user} image pack.zip`);
                  });
                });
                customData = [];
                images = [];
                page = 1;
                images.length = 0;
              }
            });
        }
      } else {
        page++;
        handleImageDownload(id, totalImages, 30, title, user, apiSource);
      }
    },

    error: (xhr: any, status: string, error: string) => {
      //if the status returns an error then there is an issue
      if (status == 'error') {
        Swal.fire({
          toast: true,
          text: 'An error occured',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
          position: 'top',
        }).then((willProceed) => {
          Swal.fire({
            toast: true,
            text: 'Try again :)',
            icon: 'info',
            showConfirmButton: false,
            timer: 3000,
            position: 'top',
          });
        });
      }
    },
  });
};
