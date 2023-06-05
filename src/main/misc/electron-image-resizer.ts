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

  sharp(buffer)
    .resize({ height, width })
    .toBuffer()
    .then((buffer: Buffer) => {
      event.reply('image-resized', buffer);
    })
    .catch((error: string) => {
      event.sender.send('resize-image-error', error);
    });
});

/*listen for image flip*/
ipcMain.on('flip-image', (event, prams: any) => {
  const { file, direction } = prams;
  const buffer = Buffer.from(file, 'base64');

  switch (direction) {
    case 'right':
      sharp(buffer)
        .flop()
        .toBuffer()
        .then((buffer: Buffer) => {
          event.sender.send('flip-right-success', buffer);
        })
        .catch((error: any) => {
          event.sender.send('image-flip-error', error);
        });
      break;

    case 'left':
      sharp(buffer)
        .flop(true)
        .toBuffer()
        .then((buffer: Buffer) => {
          event.sender.send('flip-left-success', buffer);
        })
        .catch((error: any) => {
          event.sender.send('image-flip-error', error);
        });
      break;
  }
});
