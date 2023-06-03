import { ipcMain, dialog, app } from 'electron';
import { retriveFileName } from './../util';
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

interface ImageConversionProps {
  fileConversionFormat: string;
  files: File[];
}
ipcMain.on(
  'convert-images',
  async (event: Electron.IpcMainEvent, prams: any) => {
    const { files, fileConversionFormat, fileName } = prams;
    const downloadPath = app.getPath('downloads');
    const convertedFileName = `${retriveFileName(
      fileName
    )}-fotograph-preview.${fileConversionFormat}`;
    const outputPath = path.join(downloadPath, convertedFileName.toLowerCase());

    const buffer = Buffer.from(files, 'base64');
    sharp(buffer).toFile(outputPath, (error: any, info: any) => {
      if (error) {
        event.sender.send('conversion-failed', {
          status: 500,
          message: error.message || 'an error occured during image conversion',
        });
        console.log('conversion-failed');
      } else {
        event.sender.send('conversion-successful', {
          status: 200,
          message: `Image files converted successfuly`,
          filePath: outputPath
        });
        console.log('conversion-successful');
      }
    });
  }
);

function saveImage(
  event: Electron.IpcMainEvent,
  imagePath: string,
  imageName: string
) {
  dialog
    .showSaveDialog({
      defaultPath: imageName,
      filters: [{ name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'gif'] }],
    })
    .then((result) => {
      if (!result.canceled) {
        const destinationPath = result.filePath;

        fs.copyFile(imagePath, destinationPath, (error: any) => {
          if (error) {
            event.sender.send('image-save-failed', {
              status: 500,
              message: 'an error occurred while saving the image',
              error: error,
            });
          } else {
            console.log('Image saved successfully!');
            event.sender.send('image-saved', {
              status: 200,
              message: 'image saved successfully',
              image: destinationPath,
            });
          }
        });
      }
    })
    .catch((err) => {
      event.sender.send('image-save-failed', {
        status: 500,
        message: 'an error occurred while saving the image',
        error: err,
      });
    });
}
