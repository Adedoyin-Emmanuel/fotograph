import { Notification } from 'electron';
import { ipcMain, dialog, shell } from 'electron';
interface notificationProps {
  title: string;
  text: string;
  type: string;
}

ipcMain.on('show-notification', (event, message: notificationProps) => {
  const { title, text } = message;
  const notification = new Notification({
    title: title,
    body: text,
  });

  notification.show();
});

ipcMain.on('show-dialog', (event, messageArgs: any) => {
  const filePath = messageArgs;
  dialog
    .showMessageBox({
      type: 'info',
      message: 'Image Converted Successfully',
      detail: `The converted image was saved in: ${filePath}`,
      buttons: ['Open Folder', 'Close'],
      defaultId: 0,
    })
    .then((response) => {
      if (response.response === 0) {
        shell.showItemInFolder(filePath);
      }
    });
});
