import mongoose, { Schema, Document } from "mongoose";

export interface IRequest extends Document {
  menteeId: mongoose.Types.ObjectId;
  mentorId: mongoose.Types.ObjectId;
  amount: number;
  transactionNumber: string;
  schedule: { date: number; month: number; year: number; time: string };
  messageSent: string;
}

const RequestSchema = new Schema<IRequest>(
  {
    menteeId: { type: Schema.Types.ObjectId, ref: "Mentee", required: true },
    mentorId: { type: Schema.Types.ObjectId, ref: "Mentor", required: true },
    amount: { type: Number, required: true },
    transactionNumber: { type: String, required: true },
    schedule: {
      date: Number,
      month: Number,
      year: Number,
      time: String,
    },
    messageSent: String,
  },
  { timestamps: true }
);

export default mongoose.model<IRequest>("Request", RequestSchema);
