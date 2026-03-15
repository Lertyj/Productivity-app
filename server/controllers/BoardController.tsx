import { Request, Response } from "express";
import { validationResult } from "express-validator";
import BoardModel from "../models/Board";
import ColumnModel from "../models/Column";
import TaskModel from "../models/Task";
import { IBoard, IColumn, ITask } from "../types/Type";
import { Types } from "mongoose";

const handleValidationErrors = (
  req: Request,
  res: Response,
): boolean | null => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json(errors.array());
    return true;
  }
  return null;
};

export const createBoard = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    const { title } = req.body;

    const doc = new BoardModel<IBoard>({
      title,

      owner: new Types.ObjectId(userId),
      columnIds: [],
    });

    const board = await doc.save();

    res.status(201).json(board);
  } catch (err) {
    console.error("Error creating board:", err);
    res.status(500).json({ message: "Could not create board" });
  }
};
