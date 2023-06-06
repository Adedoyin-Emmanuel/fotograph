// import { ipcMain, dialog, app } from 'electron';
// import path from 'path';
// import imagemin from 'imagemin';
// import imageminJpegtran from 'imagemin-jpegtran';
// import imageminPngquant from 'imagemin-pngquant';
// import fs from 'fs';

// ipcMain.on('reduce-image-size', async (event, params) => {
//   const { file, fileName } = params;
//   const inputBuffer = Buffer.from(file, 'base64');

//   try {
//     const outputBuffer = await imagemin.buffer(inputBuffer, {
//       plugins: [
//         imageminJpegtran(),
//         imageminPngquant({
//           quality: [0.6, 0.8],
//         }),
//       ],
//     });

//     const originalImageSize = inputBuffer.length / 1024;
//     const compressedImageSize = outputBuffer.length / 1024;

//     const tempFilePath = path.join(
//       app.getPath('downloads'),
//       `fotograph-compressed-${fileName}`
//     );
//     fs.writeFileSync(tempFilePath, outputBuffer);

//     event.sender.send('image-compress-success', {
//       originalFileName: fileName,
//       originalFileSize: `${originalImageSize.toFixed(2)} Kb`,
//       reducedFileSize: `${compressedImageSize.toFixed(2)} Kb`,
//       filePath: tempFilePath,
//     });
//   } catch (error:any) {
//     event.sender.send('image-compress-error', error.message);
//   }
// });
