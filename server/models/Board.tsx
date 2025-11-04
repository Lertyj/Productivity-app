import mongoose, { Schema, Model } from "mongoose";
import { IBoard } from "../types/Type";

const BoardSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const BoardModel: Model<IBoard> = mongoose.model<IBoard>("Board", BoardSchema);

export default BoardModel;
