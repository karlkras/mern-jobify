import multer from 'multer';
import DataParser from 'datauri/parser.js';
import path from 'path';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const dataParser = new DataParser();

export const formatImage = (file) => {
  const extension = path.extname(file.originalname).toString();
  return dataParser.format(extension, file.buffer).content;
};

export default upload;
