import express from "express";
import mongoose from "mongoose";

import { registerValidation } from "./validations/auth.js";
import checkAuth from "./utils/checkAuth.js";

import * as UserController from "./controllers/UserController.js";

mongoose
  .connect(
    "mongodb+srv://admin:wwwwww@cluster0.w1jmc.mongodb.net/todoapp?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("111Hello World!");
});

app.post("/auth/login", UserController.login);
app.post("/auth/register", registerValidation, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("server ok");
});
