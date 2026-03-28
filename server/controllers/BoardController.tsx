import { Request, Response } from "express"; // Импортируем обычный Request
import BoardModel from "../models/Board";
import { IBoard } from "../types/Type";
import { Types } from "mongoose";

export const createBoard = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?._id;
    const { title } = req.body;

    if (!userId) {
      res.status(401).json({ message: "Пользователь не авторизован" });
      return;
    }

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

export const getUserBoards = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      res.status(401).json({ error: "Пользователь не определен" });
      return;
    }

    const boards = await BoardModel.find({ owner: userId });
    res.json(boards);
  } catch (error) {
    console.error("Error fetching boards:", error);
    res.status(500).json({ error: "Ошибка при получении досок из БД" });
  }
};
