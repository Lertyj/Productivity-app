import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../server/lib/dbConnect";
import BoardModel from "../../../../server/models/Board";
import {
  ApiResponse,
  Board as BoardType,
  CreateBoardRequestBody,
} from "../../App/Types/Type";
import { IBoard } from "../../../../server/types/Type";
import { withAuth } from "../../Utils/WithNextAuth";
import { HydratedDocument } from "mongoose";

declare module "next" {
  interface NextApiRequest {
    userId?: string;
  }
}

type ErrorType = Error | { message: string } | unknown;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<BoardType | BoardType[] | null>>
) => {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const userId = req.userId;
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Пользователь не аутентифицирован.",
        });
      }

      const { title }: CreateBoardRequestBody = req.body;

      if (!title) {
        return res
          .status(400)
          .json({ success: false, error: "Title is required." });
      }

      const board: HydratedDocument<IBoard> = await BoardModel.create({
        title,
        owner: userId,
      });

      const boardResponse: BoardType = {
        ...board.toObject(),
        _id: board._id.toString(),
        userId: board.owner.toString(),

        columnIds: board.columnIds
          ? board.columnIds.map((id) => id.toString())
          : [],
      };

      return res.status(201).json({ success: true, data: boardResponse });
    } catch (error: ErrorType) {
      console.error("Ошибка при создании доски:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Server Error";
      return res.status(500).json({
        success: false,
        error: errorMessage,
        message: "Не удалось создать доску.",
      });
    }
  } else if (req.method === "GET") {
    try {
      const userId = req.userId;
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Пользователь не аутентифицирован.",
        });
      }

      const boardsFromDb = await BoardModel.find({ owner: userId }).lean();

      const boards: BoardType[] = boardsFromDb.map((board) => ({
        ...board,
        _id: board._id.toString(),
        userId: board.owner.toString(),

        columnIds: board.columnIds
          ? board.columnIds.map((id) => id.toString())
          : [],
      }));

      return res.status(200).json({ success: true, data: boards });
    } catch (error: ErrorType) {
      console.error("Ошибка при получении досок:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Server Error";
      return res.status(500).json({
        success: false,
        error: errorMessage,
        message: "Не удалось получить доски.",
      });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default withAuth(handler);
