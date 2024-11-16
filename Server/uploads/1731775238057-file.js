import express from "express";
import multer from "multer";
import File from "../models/File.js";
import mongoose from "mongoose";
const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});
const upload = multer({ storage });

// Upload route
router.post("/upload", upload.single("file"), async (req, res) => {
  const { userId } = req.body;
  // Check if userId is provided
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const uploaderId =new mongoose.Types.ObjectId(userId);

    const newFile = new File({
      filename: req.file?.filename,
      uploaderId,
    });
    await newFile.save();
    res.status(201).json({ message: "File uploaded successfully" });
  } catch (error) {
    console.log("Error uploading file:", error.message);
    res.status(500).json({ message: "Error uploading file" });
  }
});

// Route to access a file and log the event
router.get("/:id", async (req, res) => {
  try {
    const fileId = req.params.id;
    const userId = req.user.id;

    // Find the file by ID
    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // Log access in the accessLog array
    file.accessLog.push({ userId, status: "successful" });
    await file.save();

    // Send the file information (or the file itself, if desired)
    res.status(200).json({
      message: "File accessed",
      file: file.filename,
      accessLog: file.accessLog,
    });
  } catch (error) {
    console.error("Error accessing file:", error);
    res.status(500).json({ message: "Error accessing file" });
  }
});

// Route to get all files uploaded by a specific user with clerkUserId
router.get("/user-files/:clerkUserId", async (req, res) => {
  try {
    const clerkUserId = req.params.clerkUserId;

    // Find all files uploaded by the user with the provided clerkUserId
    const files = await File.find({ uploaderId: clerkUserId });

    if (!files.length) {
      return res.status(404).json({ message: "No files found for this user" });
    }

    res.status(200).json(files);
  } catch (error) {
    console.error("Error getting user's files:", error.message);
    res.status(500).json({ message: "Error retrieving user files" });
  }
});

// Route to get all files uploaded by a specific user with clerkUserId
router.get("/user-files/:clerkUserId", async (req, res) => {
  try {
    const clerkUserId = req.params.clerkUserId;

    // Find all files uploaded by the user with the provided clerkUserId
    const files = await File.find({ uploaderId: clerkUserId });

    if (!files.length) {
      return res.status(404).json({ message: "No files found for this user" });
    }

    res.status(200).json(files);
  } catch (error) {
    console.error("Error getting user's files:", error.message);
    res.status(500).json({ message: "Error retrieving user files" });
  }
});

// Route to download a file (ensure this is protected)
router.get("/download/:id", async (req, res) => {
  try {
    const fileId = req.params.id;
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    const filePath = `uploads/${file.filename}`;
    res.download(filePath, file.filename, (err) => {
      if (err) {
        console.error("Error downloading file:", err.message);
        res.status(500).json({ message: "Error downloading file" });
      }
    });
  } catch (error) {
    console.error("Error accessing file for download:", error.message);
    res.status(500).json({ message: "Error accessing file" });
  }
});

export default router;
