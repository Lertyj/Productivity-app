import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/Type";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "your_fallback_secret_key";

export default (req: Request, res: Response, next: NextFunction): void => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;

      req.userId = decoded._id;

      next();
    } catch (error: unknown) {
      console.error("JWT verification error:", error);
      res.status(403).json({
        message: "Нет доступа",
      });
      return;
    }
  } else {
    res.status(403).json({
      message: "Нет доступа",
    });
    return;
  }
};
