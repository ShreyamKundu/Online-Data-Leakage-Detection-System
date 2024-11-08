import mongoose, { Document, Schema, Model } from 'mongoose';

// Define the type for the access log entry
interface IAccessLog {
  userId: mongoose.Types.ObjectId;
  status: 'successful' | 'failed';
  reason?: string; // Optional reason for failed access
  timestamp: Date;
}

// Define the type for the file document
interface IFile extends Document {
  filename: string;
  uploaderId: mongoose.Types.ObjectId;
  uploadDate: Date;
  accessLog: IAccessLog[];
}

// Create the access log schema
const accessLogSchema: Schema<IAccessLog> = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['successful', 'failed'], required: true },
  reason: { type: String }, // Optional reason for failed access
  timestamp: { type: Date, default: Date.now },
});

// Create the file schema
const fileSchema: Schema<IFile> = new Schema({
  filename: { type: String, required: true },
  uploaderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  uploadDate: { type: Date, default: Date.now },
  accessLog: [accessLogSchema], // Use the accessLogSchema here
});

// Create and export the file model
const File: Model<IFile> = mongoose.model<IFile>('File', fileSchema);

export default File;
