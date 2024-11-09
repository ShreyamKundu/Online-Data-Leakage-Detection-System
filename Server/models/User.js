import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    profileUrl: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

export default mongoose.model('User', userSchema);
