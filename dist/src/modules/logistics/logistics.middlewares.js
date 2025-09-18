"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.getFileUrl = exports.upload = exports.uploadFields = exports.uploadMultiple = exports.uploadSingle = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Create uploads directory if it doesn't exist
const uploadsDir = path_1.default.join(__dirname, "../../../uploads/logistics");
if (!fs_1.default.existsSync(uploadsDir)) {
    fs_1.default.mkdirSync(uploadsDir, { recursive: true });
}
// Configure storage
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        // Generate unique filename with timestamp
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const extension = path_1.default.extname(file.originalname);
        const basename = path_1.default.basename(file.originalname, extension);
        cb(null, `${basename}-${uniqueSuffix}${extension}`);
    },
});
// File filter for document types
const fileFilter = (req, file, cb) => {
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
    }
    else {
        cb(new Error(`File type ${file.mimetype} is not allowed. Allowed types: PDF, DOC, DOCX, XLS, XLSX, TXT, JPG, PNG, GIF, WEBP`));
    }
};
// Configure multer upload
const upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
        files: 5, // Maximum 5 files per upload
    },
});
exports.upload = upload;
// Middleware for single file upload
const uploadSingle = (fieldName) => {
    return (req, res, next) => {
        const uploadSingleFile = upload.single(fieldName);
        uploadSingleFile(req, res, (err) => {
            if (err instanceof multer_1.default.MulterError) {
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
            }
            else if (err) {
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
exports.uploadSingle = uploadSingle;
// Middleware for multiple file uploads
const uploadMultiple = (fieldName, maxCount = 5) => {
    return (req, res, next) => {
        const uploadMultipleFiles = upload.array(fieldName, maxCount);
        uploadMultipleFiles(req, res, (err) => {
            if (err instanceof multer_1.default.MulterError) {
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
            }
            else if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message,
                });
            }
            next();
        });
    };
};
exports.uploadMultiple = uploadMultiple;
// Middleware for mixed file uploads (different fields)
const uploadFields = (fields) => {
    return (req, res, next) => {
        const uploadFieldsConfig = upload.fields(fields);
        uploadFieldsConfig(req, res, (err) => {
            if (err instanceof multer_1.default.MulterError) {
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
            }
            else if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message,
                });
            }
            next();
        });
    };
};
exports.uploadFields = uploadFields;
// Utility function to get file URL
const getFileUrl = (filename) => {
    return `/uploads/logistics/${filename}`;
};
exports.getFileUrl = getFileUrl;
// Utility function to delete file
const deleteFile = (filename) => {
    return new Promise((resolve, reject) => {
        const filePath = path_1.default.join(uploadsDir, filename);
        fs_1.default.unlink(filePath, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
};
exports.deleteFile = deleteFile;
