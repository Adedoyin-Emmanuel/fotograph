const { ipcMain, dialog, app } = require('electron');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

/*Define the utility function to save files*/
ipcMain.on('save-file', (event, prams: any) => {
  const { files, fileName } = prams;
  const savePath = path.resolve(app.getPath('downloads'), fileName);

  fs.writeFile(savePath, files, (error: any) => {
    if (error) {
      event.sender.send('save-file-response', {
        success: false,
        error: error.message,
      });
    } else {
      event.sender.send('save-file-response', {
        success: true,
        filePath: savePath,
      });
    }
  });
});

/*listen for image-rotate events in the renderer process*/
ipcMain.on('rotate-image', (event, prams: any) => {
  const { file, rotationAngle } = prams;

  const buffer = Buffer.from(file, 'base64');
  sharp(buffer)
    .rotate(parseInt(rotationAngle))
    .toBuffer()
    .then((rotatedBuffer: Buffer) => {
      event.sender.send('image-rotated', rotatedBuffer);
    })
    .catch((error: any) => {
      event.sender.send('rotate-image-error', error);
    });
});

/*listen for image-brightness events in the renderer process*/
ipcMain.on('adjust-brightness', (event, prams: any) => {
  const { file, brightnessValue } = prams;
  const buffer = Buffer.from(file, 'base64');

  sharp(buffer)
    .modulate({ brightness: parseInt(brightnessValue) })
    .toBuffer()
    .then((buffer: Buffer) => {
      event.sender.send('image-brightned', buffer);
      console.log(buffer);
    })
    .catch((error: any) => {
      event.sender.send('brightness-adjust-error', error);
      console.log(error);
    });
});

/*listen for image-resize events in the renderer process*/
ipcMain.on('resize-image', (event, prams: any) => {
  const { file, height, width } = prams;
  const buffer = Buffer.from(file, 'base64');
  console.log(height);
  console.log(width);
  if (parseInt(height) <= 0 || parseInt(width) <= 0) {
    event.sender.send('resize-image-error', '0-arguments');
    return;
  }
  sharp(buffer)
    .resize({
      width: parseInt(width),
      height: parseInt(height),
      fit: 'inside',
      withoutEnlargement: true,
    })
    .toBuffer()
    .then((buffer: Buffer) => {
      event.reply('image-resized', buffer);
    })
    .catch((error: string) => {
      event.sender.send('resize-image-error', error);
    });
});

/*listen for image flip*/
ipcMain.on('flip-image', async (event, params) => {
  const { file, direction } = params;
  const buffer = Buffer.from(file, 'base64');

  try {
    let flippedBuffer;

    if (direction === 'right') {
      flippedBuffer = await sharp(buffer).flop().toBuffer();
      event.sender.send('flip-right-success', flippedBuffer);
    } else if (direction === 'left') {
      flippedBuffer = await sharp(buffer).flop(true).toBuffer();
      event.sender.send('flip-left-success', flippedBuffer);
    }
  } catch (error) {
    event.sender.send('image-flip-error', error);
  }
});
