import multer from "multer";
import path from "path";
import { Request, Response, NextFunction } from "express";
import fs from "fs";

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "../../../uploads/logistics");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extension);
    cb(null, `${basename}-${uniqueSuffix}${extension}`);
  },
});

// File filter for document types
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimes = [
    // Documents
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/plain",
    // Images
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`File type ${file.mimetype} is not allowed. Allowed types: PDF, DOC, DOCX, XLS, XLSX, TXT, JPG, PNG, GIF, WEBP`));
  }
};

// Configure multer upload
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 5, // Maximum 5 files per upload
  },
});

// Middleware for single file upload
export const uploadSingle = (fieldName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const uploadSingleFile = upload.single(fieldName);

    uploadSingleFile(req, res, (err: any) => {
      if (err instanceof multer.MulterError) {
        // Multer-specific errors
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            success: false,
            message: "File too large. Maximum size allowed is 10MB.",
          });
        }
        if (err.code === "LIMIT_FILE_COUNT") {
          return res.status(400).json({
            success: false,
            message: "Too many files. Maximum 5 files allowed.",
          });
        }
        if (err.code === "LIMIT_UNEXPECTED_FILE") {
          return res.status(400).json({
            success: false,
            message: `Unexpected field name. Expected '${fieldName}'.`,
          });
        }
      } else if (err) {
        // General errors
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }

      // No errors, proceed
      next();
    });
  };
};

// Middleware for multiple file uploads
export const uploadMultiple = (fieldName: string, maxCount: number = 5) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const uploadMultipleFiles = upload.array(fieldName, maxCount);

    uploadMultipleFiles(req, res, (err: any) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            success: false,
            message: "One or more files are too large. Maximum size allowed is 10MB per file.",
          });
        }
        if (err.code === "LIMIT_FILE_COUNT") {
          return res.status(400).json({
            success: false,
            message: `Too many files. Maximum ${maxCount} files allowed.`,
          });
        }
      } else if (err) {
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }

      next();
    });
  };
};

// Middleware for mixed file uploads (different fields)
export const uploadFields = (fields: Array<{ name: string; maxCount: number }>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const uploadFieldsConfig = upload.fields(fields);

    uploadFieldsConfig(req, res, (err: any) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            success: false,
            message: "One or more files are too large. Maximum size allowed is 10MB per file.",
          });
        }
        if (err.code === "LIMIT_FILE_COUNT") {
          return res.status(400).json({
            success: false,
            message: "Too many files uploaded for one or more fields.",
          });
        }
      } else if (err) {
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }

      next();
    });
  };
};

// Export configured multer instance for advanced usage
export { upload };

// Utility function to get file URL
export const getFileUrl = (filename: string): string => {
  return `/uploads/logistics/${filename}`;
};

// Utility function to delete file
export const deleteFile = (filename: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(uploadsDir, filename);
    fs.unlink(filePath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
