import express from 'express';
import User from "../models/User.js";

const router = express.Router();

// Route to add a new user if clerkId is unique
router.post('/register', async (req, res) => {
    const { clerkId, email, firstName, lastName, profileUrl } = req.body;

    // Basic validation
    if (!clerkId || !email || !firstName) {
        return res.status(400).json({ message: 'ClerkId, email, and first name are required' });
    }

    try {
        // Check if a user with the same clerkId already exists
        const existingUser = await User.findOne({ clerkId });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this ClerkId already exists' });
        }

        // Save new user to the database
        const newUser = new User({ clerkId, email, firstName, lastName, profileUrl });
        await newUser.save();

        res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding user', error: error.message });
    }
});

export default router;