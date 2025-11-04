// import { Router } from "express";
// import * as BoardController from "../controllers/BoardController";
// import {
//   createBoardValidation,
//   updateBoardValidation,
// } from "../validations/BoardValidation";
// import {
//   createColumnValidation,
//   updateColumnValidation,
// } from "../validations/ColumnValidation";
// import {
//   createTaskValidation,
//   updateTaskValidation,
// } from "../validations/TaskValidation";
// import checkAuth from "../utils/checkAuth";

// const router = Router();

// router.post(
//   "/boards",
//   checkAuth,
//   createBoardValidation,
//   BoardController.createBoard
// );
// router.get("/boards", checkAuth, BoardController.getBoards);
// router.get("/boards/:id", checkAuth, BoardController.getBoardById);
// router.patch(
//   "/boards/:id",
//   checkAuth,
//   updateBoardValidation,
//   BoardController.updateBoard
// );
// router.delete("/boards/:id", checkAuth, BoardController.deleteBoard);

// router.post(
//   "/columns",
//   checkAuth,
//   createColumnValidation,
//   BoardController.createColumn
// );
// router.patch(
//   "/columns/:id",
//   checkAuth,
//   updateColumnValidation,
//   BoardController.updateColumn
// );
// router.delete("/columns/:id", checkAuth, BoardController.deleteColumn);

// router.get(
//   "/boards/:boardId/columns",
//   checkAuth,
//   BoardController.getColumnsByBoardId
// );

// router.post(
//   "/tasks",
//   checkAuth,
//   createTaskValidation,
//   BoardController.createTask
// );
// router.patch(
//   "/tasks/:id",
//   checkAuth,
//   updateTaskValidation,
//   BoardController.updateTask
// );
// router.delete("/tasks/:id", checkAuth, BoardController.deleteTask);

// router.get(
//   "/columns/:columnId/tasks",
//   checkAuth,
//   BoardController.getTasksByColumnId
// );

// export default router;
