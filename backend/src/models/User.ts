import { Document, model, Schema } from 'mongoose';

interface IUser extends Document {
  clerkUserId: string;
  firstName: string;
  lastName?: string;
  profileUrl?: string;
  email: string;
}

const UserSchema = new Schema<IUser>({
  clerkUserId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, default: '' },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
}, {
  timestamps: true,
});

export const User = model<IUser>('User', UserSchema);
export type { IUser };
