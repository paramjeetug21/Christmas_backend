import { model, Schema, Document } from "mongoose";

export interface User extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema<User>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const userModel = model<User>("User", userSchema);
