import { ipcMain, dialog, app } from 'electron';
const path = require('path');

ipcMain.on("reduce-image-size", (event: Electron.IpcMainEvent, prams) =>{
  const {file, fileName, fileExtension} = prams;

  const buffer = Buffer.from(file, "base64");
  sharp(buffer)

});
