import fs from "fs";
import path from "path";
import multer from "multer";
import { v4 as uuid } from "uuid";

// Configure upload destination
function createPdfUpload(folderName: string) {
  const uploadPath = path.join
      (process.cwd(),
      "uploads", 
      folderName);

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadPath);
  },

  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname);

    cb(null, `${uuid()}${extension}`);
  },
});

// Validate uploaded file
const fileFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
  if (file.mimetype !== "application/pdf") {
    return cb(new Error("Only PDF files are allowed."));
  }

  cb(null, true);
};

//limit file size
return multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
}

export { createPdfUpload };