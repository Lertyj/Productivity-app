// auth.js
import { Router } from "express";
import { body } from "express-validator";
import { register } from "../controllers/UserController.js"; // Импортируйте вашу функцию регистрации

const router = Router();

// Валидация
export const registerValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен быть минимум 5 символов").isLength({
    min: 5,
  }),
];

// Определите маршрут для регистрации с валидацией
router.post("/register", registerValidation, register);

export default router;
