import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  lastLogin?: Date;
  permission: "superadmin" | "moderator";
}

const AdminSchema = new Schema<IAdmin>(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    phone: String,
    password: String,
    lastLogin: Date,
    permission: { type: String, enum: ["superadmin", "moderator"], default: "moderator" },
  },
  { timestamps: true }
);

export default mongoose.model<IAdmin>("Admin", AdminSchema);
