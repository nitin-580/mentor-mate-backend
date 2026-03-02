import mongoose, { Schema, Document } from "mongoose";

export interface IComplaint extends Document {
  category: string;
  topic: string;
  description: string;
  image?: string;
  dateOfSubmission: Date;
}

const ComplaintSchema = new Schema<IComplaint>(
  {
    category: String,
    topic: String,
    description: String,
    image: String,
    dateOfSubmission: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<IComplaint>("Complaint", ComplaintSchema);
