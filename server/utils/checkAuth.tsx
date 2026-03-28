import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token =
      req.cookies.jwt ||
      (req.headers.authorization || "").replace(/Bearer\s?/, "");

    if (!token) {
      res.status(403).json({ success: false, message: "Токен не найден" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      _id: string;
    };

    req.user = {
      _id: decoded._id,
    };

    next();
  } catch (e) {
    res.status(403).json({ success: false, message: "Неверный токен" });
    return;
  }
};
