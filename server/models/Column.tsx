import { Schema, model } from "mongoose";
import { IColumnDocument } from "../types/Type";

const ColumnSchema = new Schema<IColumnDocument>(
  {
    title: { type: String, required: true },
    boardId: { type: Schema.Types.ObjectId, ref: "Board", required: true },
    taskIds: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    order: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const ColumnModel = model<IColumnDocument>("Column", ColumnSchema);

export default ColumnModel;
