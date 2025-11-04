import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { JwtPayload, ApiResponse, ApiErrorResponse } from "../App/Types/Type";

const NEXT_JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "secret111";

export const withAuth = <TData,>(
  handler: (
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse<TData>>
  ) => Promise<void> | void
) => {
  return async (
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse<TData> | ApiErrorResponse>
  ) => {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

    if (!token) {
      return res.status(403).json({
        success: false,
        message: "Нет доступа. Токен не предоставлен.",
      });
    }

    try {
      const decoded = jwt.verify(token, NEXT_JWT_SECRET_KEY) as JwtPayload;
      req.userId = decoded._id;
      return handler(req, res as NextApiResponse<ApiResponse<TData>>);
    } catch (error: unknown) {
      console.error("JWT verification error in Next.js API:", error);
      return res.status(403).json({
        success: false,
        message: "Нет доступа. Недействительный токен.",
        error:
          error instanceof Error
            ? error.message
            : "Неизвестная ошибка верификации токена.",
      });
    }
  };
};
