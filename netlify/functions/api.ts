import {
  Handler,
  Context,
  HandlerEvent,
  HandlerResponse,
} from "@netlify/functions";
import serverless from "serverless-http";
import dotenv from "dotenv";

import express, { RequestHandler } from "express";
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

const dbErrorMiddleware: RequestHandler = (req: any, res: any, next: any) => {
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
        console.log(
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

  app.get("/", (req: any, res: any) => {
    res.send("Hello World from Netlify Function!");
  });

  app.post(
    "/auth/register",
    dbErrorMiddleware,
    registerValidation,
    UserController.register as RequestHandler
  );
  app.post(
    "/auth/login",
    dbErrorMiddleware,
    registerValidation,
    UserController.login as RequestHandler
  );

  app.get(
    "/auth/me",
    dbErrorMiddleware,
    checkAuth as RequestHandler,
    UserController.getMe as RequestHandler
  );
  app.post(
    "/auth/resetpassword",
    dbErrorMiddleware,
    resetPasswordValidation,
    UserController.resetPassword as RequestHandler
  );

  app.use((req: any, res: any) => {
    console.log(`404 NOT FOUND: ${req.method} ${req.originalUrl}`);
    res.status(404).json({
      message: "Route Not Found in Function",
      path: req.originalUrl,
      success: false,
    });
  });

  app.use((err: Error, req: any, res: any, next: any) => {
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

export const handler = (async (event: HandlerEvent, context: Context) => {
  const server = await setupServer();

  return await server(event, context as any);
}) as serverless.Handler;
