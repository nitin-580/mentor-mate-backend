import mongoose, { Schema, Document } from "mongoose";

export interface IReviewRated extends Document {
  mentorId: mongoose.Types.ObjectId;
  requestId: mongoose.Types.ObjectId;
  comment: string;
  rating: number;
  spam: boolean;
  lastLogin?: Date;
}

const ReviewRatedSchema = new Schema<IReviewRated>(
  {
    mentorId: { type: Schema.Types.ObjectId, ref: "Mentor" },
    requestId: { type: Schema.Types.ObjectId, ref: "Request" },
    comment: String,
    rating: { type: Number, min: 1, max: 5 },
    spam: { type: Boolean, default: false },
    lastLogin: Date,
  },
  { timestamps: true }
);

export default mongoose.model<IReviewRated>("ReviewRated", ReviewRatedSchema);
