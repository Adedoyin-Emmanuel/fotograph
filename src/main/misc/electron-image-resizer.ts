const { ipcMain, dialog, app } = require('electron');
const fs = require('fs');
const path = require('path');

ipcMain.on('save-file', (event, { file, filePath }) => {
  const savePath = path.resolve(app.getPath('downloads'), filePath);

  fs.writeFile(savePath, file, (error: any) => {
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
