import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/UserController.js";
import {
  registerValidation,
  resetPasswordValidation,
} from "./validations/auth.js";

mongoose
  .connect(
    "mongodb+srv://admin:www@cluster0.w1jmc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/auth/register", registerValidation, UserController.register);
app.post("/auth/login", registerValidation, UserController.login);

app.get("/auth/me", checkAuth, UserController.getMe);
app.post(
  "/auth/resetpassword",
  resetPasswordValidation,
  UserController.resetPassword
);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Что-то пошло не так!");
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("server ok");
});
