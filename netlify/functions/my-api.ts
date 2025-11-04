import { Handler, Context, HandlerEvent } from "@netlify/functions";
import serverless from "serverless-http";
import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
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

  app.post("/auth/register", registerValidation, UserController.register);
  app.post("/auth/login", registerValidation, UserController.login);

  app.get("/auth/me", checkAuth, UserController.getMe);
  app.post(
    "/auth/resetpassword",
    resetPasswordValidation,
    UserController.resetPassword
  );
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Serverless Global Error:", err.stack);
    res.status(500).send("Serverless Error: Something went wrong!");
  });
  cachedServer = serverless(app);
  return cachedServer;
}

export const handler: Handler = async (
  event: HandlerEvent,
  context: Context
) => {
  const server = await setupServer();
  const result = await server(event, context);
  return result;
};
