import express, { Request, Response } from 'express';
import multer from 'multer';  // Correct import syntax for multer
import { StorageEngine } from 'multer';
import File from '../models/File';
import { IUser } from '../models/User'; // Importing IUser interface for User type

const router = express.Router();

// Multer configuration for file uploads
const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file: any, cb: any) => {
    cb(null, 'uploads/'); // Save files in the 'uploads' folder
  },
  filename: (req: Request, file: any, cb: any) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  }
});

const upload = multer({ storage }); // Use multer as a middleware with storage configuration

// Upload route
router.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { userId } = req.body;
    const newFile = new File({
      filename: req.file.filename,
      uploaderId: userId, // Using the user ID from the authenticated user
    });

    await newFile.save();
    res.status(201).json({ message: 'File uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file', error: (error as Error).message });
  }
});

// Route to access a file and log the event
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const fileId = req.params.id;
    const { userId } = req.body;

    // Find the file by ID
    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Log access in the accessLog array
    file.accessLog.push({ userId: userId, status: 'successful', timestamp: new Date() });
    await file.save();

    // Send the file information (or the file itself, if desired)
    res.status(200).json({
      message: 'File accessed',
      file: file.filename,
      accessLog: file.accessLog,
    });
  } catch (error) {
    console.error('Error accessing file:', error);
    res.status(500).json({ message: 'Error accessing file' });
  }
});

// Route to download a file (ensure this is protected)
router.get('/download/:id', async (req: Request, res: Response) => {
  try {
    const fileId = req.params.id;
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    const filePath = `uploads/${file.filename}`;
    res.download(filePath, file.filename, (err) => {
      if (err) {
        console.error('Error downloading file:', err.message);
        res.status(500).json({ message: 'Error downloading file' });
      }
    });
  } catch (error) {
    console.error('Error accessing file for download:', (error as Error).message);
    res.status(500).json({ message: 'Error accessing file' });
  }
});

export default router;
