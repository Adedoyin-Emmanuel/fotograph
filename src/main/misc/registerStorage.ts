import { ipcMain } from 'electron';
import { store } from './electronStore';

ipcMain.on('get-storage', (event, args) => {
  event.reply('get-storage', store.get(args));
});

ipcMain.on('set-storage', (event, args) => {
  event.reply('set-storage', store.set(args));
});
