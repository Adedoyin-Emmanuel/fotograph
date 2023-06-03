const { ipcMain, dialog, app } = require('electron');
const fs = require('fs');
const path = require('path');

ipcMain.on('save-file', (event, prams:any) => {
  const {files, fileName} = prams;
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
