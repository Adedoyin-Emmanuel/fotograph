/* Application Utility functions */

export const removeSymbols = (str: any = ''): string => {
  if (typeof str !== 'string') {
    return '';
  }
  return str.replace(/[^a-zA-Z]/g, '');
};

export const checkIfOnline = (): boolean => {
  return navigator.onLine ? true : false;
};

export const isImage = (file: any): boolean => {
  const extensions = ['jpg', 'jpeg', 'png', 'gif', 'svg'];
  const extension = file.name.split('.').pop();
  return extensions.includes(extension);
};

export const checkStringLength = (
  str: string = ' ',
  maxLength: number = 25
) => {
  return str.length > maxLength
    ? str.slice(0, maxLength) + '... (.' + retrieveFileExtension(str) + ')'
    : str;
};

export const convertBytesToKb = (byte: number) => {
  return Math.ceil(byte / 1024);
};

export function retrieveFileExtension(fileName: string): string {
  const fileExtension = fileName.split('.').pop();
  return fileExtension || '';
}
