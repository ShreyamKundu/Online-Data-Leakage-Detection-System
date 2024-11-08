import dotenv from "dotenv";
dotenv.config({ path: "./.env" }); 
import express from "express";
import cors from "cors";

import { errorMiddleware } from "./middlewares/error.js";
import { connectDB } from "./db/connectDb.js";
import bodyParser from 'body-parser';
import { handleWebhook } from "./controllers/webhook.js";

// Configuration
export const envMode = process.env.NODE_ENV?.trim() || "DEVELOPMENT";
const port = process.env.PORT || 3000;

// Create Express app
const app = express();

// Middleware setup
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "http://localhost:5173/", // Replace with your frontend URL
  credentials: true
}));

app.post('/api/webhook',bodyParser.raw({ type: 'application/json' }),handleWebhook);

// Define routes
app.get("/", (req, res) => {
  res.send("Welcome to the Data Leakage Detection System API!");
});

// Catch-all route for 404
app.get("*", (req, res) => {
  if (req.path.startsWith('/socket.io')) return;
  res.status(404).json({
    success: false,
    message: "Page not found",
  });
});

// Error handling middleware
app.use(errorMiddleware);

// Start function
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL!);
    app.listen(port, () => console.log(`Server is working on Port:${port} in ${envMode} Mode.`));
  } catch (error) {
    console.error('Error connecting to database or starting server:', error);
  }
};

// Call start function
start();
