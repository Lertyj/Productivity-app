import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/Type";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      _id: string;
    };
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.authToken;

  if (!token) {
    res.status(401).json({ message: "Нет токена, авторизация не пройдена." });
    return;
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET не определен");
    }

    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    req.user = { _id: decoded._id };

    next();
  } catch (err) {
    res.status(401).json({ message: "Токен недействителен." });
  }
};
