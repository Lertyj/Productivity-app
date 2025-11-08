import { Handler, Context, HandlerEvent } from "@netlify/functions";
import serverless from "serverless-http";
import dotenv from "dotenv";
import express, { Request, Response, NextFunction, Router } from "express";
import cors from "cors";

import dbConnect from "../../server/lib/dbConnect";
import checkAuth from "../../server/utils/checkAuth";
import * as UserController from "../../server/controllers/UserController";
import {
  registerValidation,
  resetPasswordValidation,
} from "../../server/validations/AuthValidation";

dotenv.config();

let cachedServer: serverless.Handler | null = null;
let isDbConnected = false;

const dbErrorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!isDbConnected) {
    return res.status(503).json({
      message: "Service Unavailable: Database not connected.",
      success: false,
    });
  }
  next();
};

async function setupServer() {
  if (cachedServer) {
    return cachedServer;
  }

  if (!isDbConnected) {
    const mongoUriPresent = !!process.env.MONGO_URI;
    console.log(`[MY-API DEBUG] MONGO_URI is set: ${mongoUriPresent}`);

    try {
      if (mongoUriPresent) {
        await dbConnect();
        console.log("DB connection established (Serverless)");
        isDbConnected = true;
      } else {
        console.error(
          "DB_FATAL: Cannot connect to DB because MONGO_URI is missing from Netlify Environment Variables."
        );
      }
    } catch (err) {
      console.error("DB connection error:", (err as Error).stack);
      isDbConnected = false;
    }
  }

  const app = express();
  const corsOptions = {
    origin: "*",
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.use(express.json());

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World from Netlify Function!");
  });

  const authRouter: Router = express.Router();

  authRouter.use(dbErrorMiddleware);

  authRouter.post("/register", registerValidation, UserController.register);
  authRouter.post("/login", registerValidation, UserController.login);
  authRouter.get("/me", checkAuth, UserController.getMe);
  authRouter.post(
    "/resetpassword",
    resetPasswordValidation,
    UserController.resetPassword
  );

  app.use("/auth", authRouter);

  app.use((req: Request, res: Response) => {
    res.status(404).json({
      message: "Route Not Found",
      path: req.originalUrl,
      success: false,
    });
  });

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Serverless Global Error:", err.stack);
    res.status(500).json({
      message: "Serverless Error: Something went wrong!",
      error: err.message,
      success: false,
    });
  });

  cachedServer = serverless(app);
  return cachedServer;
}

export const handler: Handler = async (
  event: HandlerEvent,
  context: Context
) => {
  const server = await setupServer();

  return await server(event, context);
};
