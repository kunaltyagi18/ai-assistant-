import File from "../models/File.js";
import path from "path";
import fs from "fs";

// ✅ Upload a file
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const { originalname, filename, mimetype, size, path: filePath } = req.file;

    // Normalize file path
    const normalizedPath = path.resolve(filePath);

    // Save file metadata in MongoDB
    const file = await File.create({
      userId: req.user?._id || null,
      fileName: originalname,
      filePath: normalizedPath,
      fileType: mimetype,
      fileSize: size,
      uploadedAt: new Date(),
    });

    // Response to frontend
    res.status(201).json({
      success: true,
      message: "File uploaded successfully!",
      data: {
        id: file._id,
        name: originalname,
        type: mimetype,
        size,
        url: `/uploads/${filename}`, // accessible URL for frontend
      },
    });
  } catch (error) {
    console.error("❌ File Upload Error:", error);
    res.status(500).json({
      success: false,
      message: "File upload failed",
      error: error.message,
    });
  }
};

// ✅ Get / Download or view uploaded file
export const getFile = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await File.findById(id);

    if (!file) {
      return res.status(404).json({ success: false, message: "File not found in database" });
    }

    const filePath = path.resolve(file.filePath);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: "File not found on server" });
    }

    // Set proper headers
    res.setHeader("Content-Type", file.fileType);

    // Stream file to frontend
    fs.createReadStream(filePath).pipe(res);
  } catch (error) {
    console.error("❌ File Retrieval Error:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving file",
      error: error.message,
    });
  }
};
