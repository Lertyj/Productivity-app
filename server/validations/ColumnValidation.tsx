import { body } from "express-validator";

export const createColumnValidation = [
  body("title", "Название колонки обязательно").isLength({ min: 3 }).isString(),
  body(
    "boardId",
    "ID доски обязательно и должно быть валидным ObjectId"
  ).isMongoId(),
  body("order", "Порядок колонки обязателен и должен быть числом").isInt({
    min: 0,
  }),
];

export const updateColumnValidation = [
  body("title", "Название колонки должно быть строкой")
    .optional()
    .isLength({ min: 3 })
    .isString(),
  body("order", "Порядок колонки должен быть числом")
    .optional()
    .isInt({ min: 0 }),
];
