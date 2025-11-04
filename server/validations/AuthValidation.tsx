import { Router } from "express";
import { body } from "express-validator";

import { register, resetPassword } from "../controllers/UserController";

const router = Router();

export const registerValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен быть минимум 5 символов").isLength({
    min: 5,
  }),
];

export const resetPasswordValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("newPassword", "Новый пароль должен быть минимум 5 символов").isLength({
    min: 5,
  }),
  body(
    "reEnterPassword",
    "Повторный пароль должен быть минимум 5 символов"
  ).isLength({
    min: 5,
  }),
];

router.post("/resetpassword", resetPasswordValidation, resetPassword);
router.post("/register", registerValidation, register);

export default router;
