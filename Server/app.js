import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Initialize dotenv to access environment variables
dotenv.config();

const app = express();

// Middleware
// Define allowed origins for CORS
const allowedOrigins = [
  'https://dataguard-shreyam-kundus-projects.vercel.app'
];

// Middleware for CORS with conditional origin handling
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the origin
    } else {
      callback(new Error('Not allowed by CORS')); // Deny the origin
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Enable credentials (cookies/auth tokens) if needed
}));
app.use(express.json());

// Import routes
import fileRoutes from './routes/file.js';
import authRoutes from './routes/auth.js';

// Use routes
app.use('/api/files', fileRoutes);
app.use('/api/auth', authRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch((error) => console.log("MongoDB connection error:", error));

// Base route
app.get('/', (req, res) => {
    res.send("Welcome to the Data Leakage Detection System API!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
