/**
 *
 * Defines get and set functions to retrive values from the elctron store
 * setData(@prams data (object))
 * getData(@prams dataToGet (string))
 *
 */

export const setData = (data: object): void => {
  if (!data) throw new Error('Args incomplete!');
  window.electron.ipcRenderer.sendMessage('set-storage', data);
};

export const getData = async (dataToGet: string): Promise<unknown> => {
  const dataPromise = new Promise((resolve) => {
    window.electron.ipcRenderer.once('get-storage', (args) => {
      resolve(args);
    });
  });
  window.electron.ipcRenderer.sendMessage('get-storage', dataToGet);

  const data = await dataPromise;
  return data;
};
