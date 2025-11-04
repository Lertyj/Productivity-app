import { Handler, Context, HandlerEvent } from "@netlify/functions";
import serverless from "serverless-http";
import dotenv from "dotenv";
import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
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
    try {
      await dbConnect();
      console.log("DB connection established (Serverless)");
      isDbConnected = true;
    } catch (err) {
      console.error("DB connection error:", err);
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
    res.send("Hello World from Productivity-app Netlify Function!");
  });

  app.post(
    "/auth/register",
    ...(registerValidation as RequestHandler[]),
    UserController.register as any
  );
  app.post(
    "/auth/login",
    ...(registerValidation as RequestHandler[]),
    UserController.login as any
  );

  app.get("/auth/me", checkAuth as any, UserController.getMe as any);
  app.post(
    "/auth/resetpassword",
    ...(resetPasswordValidation as RequestHandler[]),
    UserController.resetPassword as any
  );
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Serverless Global Error:", err.stack);
    res.status(500).send("Serverless Error: Something went wrong!");
  });
  cachedServer = serverless(app, {
    basePath: "/.netlify/functions/api",
  });
  return cachedServer;
}

export const handler = async (event: HandlerEvent, context: Context) => {
  const server = await setupServer();
  const result = await server(event, context as any);
  return result;
};
