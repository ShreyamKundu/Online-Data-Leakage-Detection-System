const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Initialize dotenv to access environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
// app.use(express.json());

// Import routes
const fileRoutes = require('./routes/file');
const { handleWebhook } = require('./controllers/webhook');

// Use routes
app.post('/api/webhook',bodyParser.raw({ type: 'application/json' }),handleWebhook);
app.use('/api/files', fileRoutes);


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
