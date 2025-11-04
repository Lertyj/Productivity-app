import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/AuthMiddleware";
import BoardModel from "../models/Board";
import { IBoard, CreateBoardRequestBody } from "../types/Type";

const router = Router();

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      _id: string;
    };
  }
}

router.post(
  "/api/boards",
  authMiddleware,
  async (
    req: Request<{}, {}, CreateBoardRequestBody>,
    res: Response
  ): Promise<void> => {
    try {
      const userId = req.user?._id;

      if (!userId) {
        res.status(401).json({ message: "Нет доступа к ID пользователя." });
        return;
      }

      const { title, description } = req.body;

      const newBoard = new BoardModel({
        title,
        description,
        owner: userId,
      });

      await newBoard.save();

      res.status(201).json({
        success: true,
        board: newBoard,
        message: "Доска успешно создана!",
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        res.status(500).send("Ошибка сервера: " + err.message);
      } else {
        res.status(500).send("Неизвестная ошибка сервера.");
      }
    }
  }
);

export default router;
