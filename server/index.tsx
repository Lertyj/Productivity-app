import dotenv from "dotenv";
dotenv.config();
import dbConnect from "./lib/dbConnect";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

import checkAuth from "./utils/checkAuth";
import * as UserController from "./controllers/UserController";
import {
  registerValidation,
  resetPasswordValidation,
} from "./validations/AuthValidation";

async function startServer() {
  try {
    await dbConnect();
    console.log("DB ok");
  } catch (err) {
    console.error("DB error", err);
    process.exit(1);
  }
  const app = express();
  const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use((req, res, next) => {
    console.log(`[LOCAL DEV] ${req.method} ${req.originalUrl}`);
    next();
  });
  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World from Local TypeScript Express!");
  });

  app.post("/auth/register", registerValidation, UserController.register);
  app.post("/auth/login", registerValidation, UserController.login);

  app.get("/auth/me", checkAuth, UserController.getMe);
  app.post(
    "/auth/resetpassword",
    resetPasswordValidation,
    UserController.resetPassword
  );

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send("Что-то пошло не так на локальном сервере!");
  });

  const PORT = process.env.PORT || 4444;

  const server = app.listen(PORT, () => {
    console.log(`Server ok, listening on port ${PORT}`);
  });

  server.on("error", (err: Error) => {
    console.error("Ошибка при запуске локального сервера:", err);
    process.exit(1);
  });
}

startServer();
