import { ipcMain } from 'electron';
import { store } from './electronStore';

ipcMain.on('get-storage', (event, args) => {
  event.reply('get-storage', store.get(args));
});

ipcMain.on('set-storage', (event, args) => {
  store.set(args);
  event.reply('storage-set-succesfully');
});

ipcMain.on('clear-storage', (event) => {
  store.clear();
  event.reply('storage-cleared-succesfully');
});
