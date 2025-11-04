import { Schema, model } from "mongoose";
import { ITaskDocument } from "../types/Type";

const TaskSchema = new Schema<ITaskDocument>(
  {
    title: { type: String, required: true },
    description: { type: String },
    columnId: { type: Schema.Types.ObjectId, ref: "Column", required: true },
    boardId: { type: Schema.Types.ObjectId, ref: "Board", required: true },
    order: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const TaskModel = model<ITaskDocument>("Task", TaskSchema);

export default TaskModel;
