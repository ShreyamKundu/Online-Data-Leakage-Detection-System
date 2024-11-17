import mongoose from 'mongoose';

const accessLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['successful', 'failed'], required: true },
    reason: { type: String }, // Optional reason for failed access
    timestamp: { type: Date, default: Date.now },
});

const fileSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    uploaderId: { type: String, ref: 'User', required: true },
    uploadDate: { type: Date, default: Date.now },
    fileSize: { type: String },
    accessLog: [accessLogSchema], // Use the accessLogSchema here
});

export default mongoose.model('File', fileSchema);
    