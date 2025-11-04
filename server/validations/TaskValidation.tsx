import { body } from "express-validator";

export const createTaskValidation = [
  body("title", "Название задачи обязательно").isLength({ min: 3 }).isString(),
  body("description", "Описание задачи должно быть строкой")
    .optional()
    .isString(),
  body(
    "columnId",
    "ID колонки обязательно и должно быть валидным ObjectId"
  ).isMongoId(),
  body(
    "boardId",
    "ID доски обязательно и должно быть валидным ObjectId"
  ).isMongoId(),
  body("order", "Порядок задачи обязателен и должен быть числом").isInt({
    min: 0,
  }),
];

export const updateTaskValidation = [
  body("title", "Название задачи должно быть строкой")
    .optional()
    .isLength({ min: 3 })
    .isString(),
  body("description", "Описание задачи должно быть строкой")
    .optional()
    .isString(),
  body("columnId", "ID колонки должно быть валидным ObjectId")
    .optional()
    .isMongoId(),
  body("order", "Порядок задачи должен быть числом")
    .optional()
    .isInt({ min: 0 }),
];
