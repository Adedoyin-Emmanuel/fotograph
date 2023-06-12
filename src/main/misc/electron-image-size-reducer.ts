import { ipcMain, app, dialog } from 'electron';
const sharp = require('sharp');
const path = require('path');
import { retriveFileName } from './../util';

ipcMain.on('compress-image', async (event, params) => {
  try {
    const {
      file,
      fileName,
      fileCompressionLevel,
      fileExtension,
      initialFileSize,
    } = params;

    let compressionLevel;

    switch (fileExtension) {
      case 'jpg':
      case 'jpeg':
      case 'webp':
        switch (fileCompressionLevel) {
          case 'High Compression':
            compressionLevel = 80;
            break;
          case 'Higher Compression':
            compressionLevel = 70;
            break;
          case 'Highest Compression':
            compressionLevel = 60;
            break;
          default:
            compressionLevel = 80;
            break;
        }
        break;
      case 'png':
        switch (fileCompressionLevel) {
          case 'High Compression':
            compressionLevel = { compressionLevel: 8, adaptiveFiltering: true };
            break;
          case 'Higher Compression':
            compressionLevel = { compressionLevel: 7, palette: true };
            break;
          case 'Highest Compression':
            compressionLevel = {
              compressionLevel: 6,
              dither: 'FloydSteinberg',
            };
            break;
          default:
            compressionLevel = { compressionLevel: 8, adaptiveFiltering: true };
            break;
        }
        break;
      default:
        compressionLevel = undefined;
        break;
    }

    const buffer = Buffer.from(file, 'base64');

    let compressedImageBuffer;

    switch (fileExtension) {
      case 'jpg':
      case 'jpeg':
        compressedImageBuffer = await sharp(buffer)
          .jpeg({ quality: compressionLevel })
          .toBuffer();
        break;
      case 'png':
        compressedImageBuffer = await sharp(buffer)
          .png(compressionLevel)
          .toBuffer();
        break;
      case 'webp':
        compressedImageBuffer = await sharp(buffer)
          .webp({ quality: compressionLevel })
          .toBuffer();
        break;
      case 'gif':
        compressedImageBuffer = await sharp(buffer).gif().toBuffer();
        break;
      default:
        throw new Error(`Unsupported image format: ${fileExtension}`);
    }

    const compressedSizeKb = compressedImageBuffer.length / 1024;

    const newFileName = `fotograph-compressed-${retriveFileName(
      fileName
    )}.${fileExtension}`;
    const downloadsPath = app.getPath('downloads');
    const outputPath = path.join(downloadsPath, newFileName);

    await sharp(compressedImageBuffer).toFile(outputPath);

    event.reply('compress-image-success', {
      compressedSizeKb,
      fileName,
      initialFileSize,
    });
  } catch (error: any) {
    event.reply('compress-image-error', { error: error.message });
  }
});
