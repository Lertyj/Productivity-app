import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env.local") });
import express, { Request, Response, NextFunction } from "express";
import dbConnect from "./lib/dbConnect";
import boardRouter from "./routes/BoardRoutes";
import cors from "cors";
import cookieParser from "cookie-parser";
import checkAuth from "./utils/checkAuth";
import * as UserController from "./controllers/UserController";
import {
  registerValidation,
  resetPasswordValidation,
} from "./validations/AuthValidation";

async function startServer() {
  console.log(
    "Проверка JWT_SECRET:",
    process.env.JWT_SECRET ? "Загружен ✅" : "НЕ НАЙДЕН ❌",
  );
  try {
    await dbConnect();
    console.log("DB ok");
  } catch (err) {
    console.error("DB error", err);
    process.exit(1);
  }

  const app = express();
  const corsOptions = {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  };
  // const corsOptions = {
  //   origin: "http://localhost:3000",
  //   credentials: true,
  //   methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  //   allowedHeaders: ["Content-Type", "Authorization"],
  // };
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(cookieParser());

  const authRouter = express.Router();
  authRouter.post("/register", registerValidation, UserController.register);
  authRouter.post("/login", registerValidation, UserController.login);
  authRouter.get("/me", checkAuth, UserController.getMe);
  authRouter.post(
    "/resetpassword",
    resetPasswordValidation,
    UserController.resetPassword,
  );
  authRouter.post("/logout", (req, res) => {
    res.clearCookie("jwt");
    res.json({ success: true });
  });
  app.use("/auth", authRouter);
  app.use("/api", boardRouter);

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
