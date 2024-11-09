import express from 'express';
import multer from 'multer';
import File  from '../models/File.js';
const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});
const upload = multer({ storage });

// Upload route
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const newFile = new File({
            filename: req.file.filename,
            uploaderId: req.user.id,
        });
        await newFile.save();
        res.status(201).json({ message: 'File uploaded successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading file' });
    }
});

// Route to access a file and log the event
router.get('/:id', async (req, res) => {
    try {
        const fileId = req.params.id;
        const userId = req.user.id;

        // Find the file by ID
        const file = await File.findById(fileId);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        // Log access in the accessLog array
        file.accessLog.push({ userId ,status: 'successful' });
        await file.save();

        // Send the file information (or the file itself, if desired)
        res.status(200).json({
            message: 'File accessed',
            file: file.filename,
            accessLog: file.accessLog
        });
    } catch (error) {
        console.error("Error accessing file:", error);
        res.status(500).json({ message: 'Error accessing file' });
    }
});


// Route to download a file (ensure this is protected)
router.get('/download/:id', async (req, res) => {
    try {
        const fileId = req.params.id;
        const file = await File.findById(fileId);
        
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        const filePath = `uploads/${file.filename}`;
        res.download(filePath, file.filename, (err) => {
            if (err) {
                console.error("Error downloading file:", err.message);
                res.status(500).json({ message: 'Error downloading file' });
            }
        });
    } catch (error) {
        console.error("Error accessing file for download:", error.message);
        res.status(500).json({ message: 'Error accessing file' });
    }
});



export default router;
