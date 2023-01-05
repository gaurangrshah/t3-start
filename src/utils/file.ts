export const imageMIMETypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/bmp',
  'image/webp',
  'image/svg+xml',
];

export const imageFileExtensions = [
  'jpeg',
  'jpg',
  'png',
  'bmp',
  'webp',
  'gif',
  'svg',
];

export function isValidImageFile(file: File) {
  return imageMIMETypes.find((mimeType) => file.type === mimeType);
}

export function isValidImageFileExt(filename: string) {
  const ext = filename.split('.').pop();
  return imageFileExtensions.find((extension) => ext === extension);
}
