import { body } from "express-validator";

export const createBoardValidation = [
  body("title", "Название доски обязательно").isLength({ min: 3 }).isString(),
  body("description", "Описание должно быть строкой").optional().isString(),
];

export const updateBoardValidation = [
  body("title", "Название доски должно быть строкой")
    .optional()
    .isLength({ min: 3 })
    .isString(),
  body("description", "Описание должно быть строкой").optional().isString(),
];
