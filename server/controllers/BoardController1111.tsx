// import { Request, Response } from "express";
// import { validationResult } from "express-validator";
// import BoardModel from "../models/Board";
// import ColumnModel from "../models/Column";
// import TaskModel from "../models/Task";
// import { IBoard, IColumn, ITask } from "../types/Type";
// import { Types } from "mongoose";

// // Эта вспомогательная функция обрабатывает ошибки валидации.
// // Если ошибки есть, она отправляет ответ и возвращает true (сигнализируя о том, что дальнейшее выполнение контроллера не нужно).
// // Если ошибок нет, она возвращает null.
// const handleValidationErrors = (
//   req: Request,
//   res: Response
// ): boolean | null => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     res.status(400).json(errors.array()); // Отправляем ошибку
//     return true; // Сигнализируем контроллеру о необходимости выйти
//   }
//   return null; // Нет ошибок
// };

// export const createBoard = async (req: Request, res: Response) => {
//   // Если handleValidationErrors отправил ответ, просто выходим из функции.
//   if (handleValidationErrors(req, res)) return;

//   try {
//     const userId = req.userId; // Предполагается, что `checkAuth` добавляет `userId` в `Request`

//     if (!userId) {
//       // Ранний выход: пользователь не авторизован
//       return res
//         .status(401)
//         .json({ message: "Unauthorized: User ID not found." });
//     }

//     const { title, description } = req.body;

//     const doc = new BoardModel<IBoard>({
//       title,
//       description,
//       owner: new Types.ObjectId(userId),
//       columnIds: [],
//     });

//     const board = await doc.save();

//     // ✅ Корректно: Отправляем успешный ответ, не возвращая его из функции
//     res.status(201).json(board);
//   } catch (err) {
//     console.error("Error creating board:", err);
//     // ✅ Корректно: Отправляем ответ об ошибке, не возвращая его из функции
//     res.status(500).json({ message: "Could not create board" });
//   }
// };

// export const getBoards = async (req: Request, res: Response) => {
//   try {
//     const userId = req.userId;

//     if (!userId) {
//       return res
//         .status(401)
//         .json({ message: "Unauthorized: User ID not found." });
//     }

//     const boards = await BoardModel.find({ owner: userId })
//       .populate({
//         path: "columnIds",
//         model: ColumnModel,
//         populate: {
//           path: "taskIds",
//           model: TaskModel,
//         },
//       })
//       .lean();

//     // ✅ Корректно
//     res.json(boards);
//   } catch (err) {
//     console.error("Error fetching boards:", err);
//     // ✅ Корректно
//     res.status(500).json({ message: "Could not retrieve boards" });
//   }
// };

// export const getBoardById = async (req: Request, res: Response) => {
//   try {
//     const boardId = req.params.id;
//     const userId = req.userId;

//     if (!userId) {
//       return res
//         .status(401)
//         .json({ message: "Unauthorized: User ID not found." });
//     }

//     const board = await BoardModel.findOne({ _id: boardId, owner: userId })
//       .populate({
//         path: "columnIds",
//         model: ColumnModel,
//         populate: {
//           path: "taskIds",
//           model: TaskModel,
//         },
//       })
//       .lean();

//     if (!board) {
//       return res
//         .status(404)
//         .json({ message: "Board not found or you do not have access." });
//     }

//     // ✅ Корректно
//     res.json(board);
//   } catch (err) {
//     console.error("Error fetching board:", err);
//     // ✅ Корректно
//     res.status(500).json({ message: "Could not retrieve board" });
//   }
// };

// export const updateBoard = async (req: Request, res: Response) => {
//   if (handleValidationErrors(req, res)) return;

//   try {
//     const boardId = req.params.id;
//     const userId = req.userId;
//     const { title, description } = req.body;

//     if (!userId) {
//       return res
//         .status(401)
//         .json({ message: "Unauthorized: User ID not found." });
//     }

//     const updatedBoard = await BoardModel.findOneAndUpdate(
//       { _id: boardId, owner: userId },
//       { title, description },
//       { new: true }
//     );

//     if (!updatedBoard) {
//       return res
//         .status(404)
//         .json({ message: "Board not found or you do not have access." });
//     }

//     // ✅ Корректно
//     res.json(updatedBoard);
//   } catch (err) {
//     console.error("Error updating board:", err);
//     // ✅ Корректно
//     res.status(500).json({ message: "Could not update board" });
//   }
// };

// export const deleteBoard = async (req: Request, res: Response) => {
//   try {
//     const boardId = req.params.id;
//     const userId = req.userId;

//     if (!userId) {
//       return res
//         .status(401)
//         .json({ message: "Unauthorized: User ID not found." });
//     }

//     const deletedBoard = await BoardModel.findOneAndDelete({
//       _id: boardId,
//       owner: userId,
//     });

//     if (!deletedBoard) {
//       return res
//         .status(404)
//         .json({ message: "Board not found or you do not have access." });
//     }

//     // Дополнительные операции по удалению связанных колонок и задач
//     const columnIds = await ColumnModel.find(
//       { boardId: boardId },
//       { _id: 1 }
//     ).lean();
//     const tasksToDelete = columnIds.map((col) => col._id);

//     await TaskModel.deleteMany({ columnId: { $in: tasksToDelete } });
//     await ColumnModel.deleteMany({ boardId: boardId });

//     // ✅ Корректно
//     res.json({ message: "Board and all its content successfully deleted." });
//   } catch (err) {
//     console.error("Error deleting board:", err);
//     // ✅ Корректно
//     res.status(500).json({ message: "Could not delete board" });
//   }
// };

// export const createColumn = async (req: Request, res: Response) => {
//   if (handleValidationErrors(req, res)) return;

//   try {
//     const { title, boardId, order } = req.body;
//     const userId = req.userId;

//     const board = await BoardModel.findOne({ _id: boardId, owner: userId });
//     if (!board) {
//       return res
//         .status(404)
//         .json({ message: "Board not found or you do not have access." });
//     }

//     const doc = new ColumnModel<IColumn>({
//       title,
//       boardId: new Types.ObjectId(boardId),
//       order,
//       taskIds: [],
//     });

//     const column = await doc.save();

//     await BoardModel.findByIdAndUpdate(boardId, {
//       $push: { columnIds: column._id },
//     });

//     // ✅ Корректно
//     res.status(201).json(column);
//   } catch (err) {
//     console.error("Error creating column:", err);
//     // ✅ Корректно
//     res.status(500).json({ message: "Could not create column" });
//   }
// };

// export const updateColumn = async (req: Request, res: Response) => {
//   if (handleValidationErrors(req, res)) return;

//   try {
//     const columnId = req.params.id;
//     const { title, order } = req.body;
//     const userId = req.userId;

//     const column = await ColumnModel.findById(columnId);
//     if (!column) {
//       return res.status(404).json({ message: "Column not found." });
//     }

//     const board = await BoardModel.findOne({
//       _id: column.boardId,
//       owner: userId,
//     });
//     if (!board) {
//       return res
//         .status(403)
//         .json({ message: "Forbidden: You do not have access to this board." });
//     }

//     const updatedColumn = await ColumnModel.findByIdAndUpdate(
//       columnId,
//       { title, order },
//       { new: true }
//     );

//     // ✅ Корректно
//     res.json(updatedColumn);
//   } catch (err) {
//     console.error("Error updating column:", err);
//     // ✅ Корректно
//     res.status(500).json({ message: "Could not update column" });
//   }
// };

// export const deleteColumn = async (req: Request, res: Response) => {
//   try {
//     const columnId = req.params.id;
//     const userId = req.userId;

//     const column = await ColumnModel.findById(columnId);
//     if (!column) {
//       return res.status(404).json({ message: "Column not found." });
//     }

//     const board = await BoardModel.findOne({
//       _id: column.boardId,
//       owner: userId,
//     });
//     if (!board) {
//       return res
//         .status(403)
//         .json({ message: "Forbidden: You do not have access to this board." });
//     }

//     const deletedColumn = await ColumnModel.findByIdAndDelete(columnId);

//     if (!deletedColumn) {
//       return res
//         .status(404)
//         .json({ message: "Column not found or could not be deleted." });
//     }

//     await TaskModel.deleteMany({ columnId: columnId });

//     await BoardModel.findByIdAndUpdate(column.boardId, {
//       $pull: { columnIds: columnId },
//     });

//     // ✅ Корректно
//     res.json({ message: "Column and its tasks successfully deleted." });
//   } catch (err) {
//     console.error("Error deleting column:", err);
//     // ✅ Корректно
//     res.status(500).json({ message: "Could not delete column" });
//   }
// };

// export const createTask = async (req: Request, res: Response) => {
//   if (handleValidationErrors(req, res)) return;

//   try {
//     const { title, description, columnId, boardId, order } = req.body;
//     const userId = req.userId;

//     const board = await BoardModel.findOne({ _id: boardId, owner: userId });
//     if (!board) {
//       return res
//         .status(404)
//         .json({ message: "Board not found or you do not have access." });
//     }

//     const column = await ColumnModel.findById(columnId);
//     if (!column || !column.boardId.equals(boardId)) {
//       return res.status(404).json({
//         message: "Column not found or does not belong to this board.",
//       });
//     }

//     const doc = new TaskModel<ITask>({
//       title,
//       description,
//       columnId: new Types.ObjectId(columnId),
//       boardId: new Types.ObjectId(boardId),
//       order,
//     });

//     const task = await doc.save();

//     await ColumnModel.findByIdAndUpdate(columnId, {
//       $push: { taskIds: task._id },
//     });

//     // ✅ Корректно
//     res.status(201).json(task);
//   } catch (err) {
//     console.error("Error creating task:", err);
//     // ✅ Корректно
//     res.status(500).json({ message: "Could not create task" });
//   }
// };

// export const updateTask = async (req: Request, res: Response) => {
//   if (handleValidationErrors(req, res)) return;

//   try {
//     const taskId = req.params.id;
//     const { title, description, columnId, order } = req.body;
//     const userId = req.userId;

//     const task = await TaskModel.findById(taskId);
//     if (!task) {
//       return res.status(404).json({ message: "Task not found." });
//     }

//     const board = await BoardModel.findOne({
//       _id: task.boardId,
//       owner: userId,
//     });
//     if (!board) {
//       return res
//         .status(403)
//         .json({ message: "Forbidden: You do not have access to this board." });
//     }

//     if (columnId && !task.columnId.equals(columnId)) {
//       const oldColumn = await ColumnModel.findById(task.columnId);
//       if (oldColumn) {
//         await ColumnModel.findByIdAndUpdate(oldColumn._id, {
//           $pull: { taskIds: taskId },
//         });
//       }

//       const newColumn = await ColumnModel.findById(columnId);
//       if (!newColumn || !newColumn.boardId.equals(task.boardId)) {
//         return res.status(400).json({
//           message: "New column not found or does not belong to the same board.",
//         });
//       }
//       await ColumnModel.findByIdAndUpdate(newColumn._id, {
//         $push: { taskIds: taskId },
//       });
//     }

//     const updatedTask = await TaskModel.findByIdAndUpdate(
//       taskId,
//       { title, description, columnId, order },
//       { new: true }
//     );

//     // ✅ Корректно
//     res.json(updatedTask);
//   } catch (err) {
//     console.error("Error updating task:", err);
//     // ✅ Корректно
//     res.status(500).json({ message: "Could not update task" });
//   }
// };

// export const deleteTask = async (req: Request, res: Response) => {
//   try {
//     const taskId = req.params.id;
//     const userId = req.userId;

//     const task = await TaskModel.findById(taskId);
//     if (!task) {
//       return res.status(404).json({ message: "Task not found." });
//     }

//     const board = await BoardModel.findOne({
//       _id: task.boardId,
//       owner: userId,
//     });
//     if (!board) {
//       return res
//         .status(403)
//         .json({ message: "Forbidden: You do not have access to this board." });
//     }

//     const deletedTask = await TaskModel.findByIdAndDelete(taskId);

//     if (!deletedTask) {
//       return res
//         .status(404)
//         .json({ message: "Task not found or could not be deleted." });
//     }

//     await ColumnModel.findByIdAndUpdate(task.columnId, {
//       $pull: { taskIds: taskId },
//     });

//     // ✅ Корректно
//     res.json({ message: "Task successfully deleted." });
//   } catch (err) {
//     console.error("Error deleting task:", err);
//     // ✅ Корректно
//     res.status(500).json({ message: "Could not delete task" });
//   }
// };

// export const getColumnsByBoardId = async (req: Request, res: Response) => {
//   try {
//     const boardId = req.params.boardId;
//     const userId = req.userId;

//     const board = await BoardModel.findOne({ _id: boardId, owner: userId });
//     if (!board) {
//       return res
//         .status(404)
//         .json({ message: "Board not found or you do not have access." });
//     }

//     const columns = await ColumnModel.find({ boardId: boardId })
//       .populate({
//         path: "taskIds",
//         model: TaskModel,
//       })
//       .lean();

//     // ✅ Корректно
//     res.json(columns);
//   } catch (err) {
//     console.error("Error fetching columns by board ID:", err);
//     // ✅ Корректно
//     res.status(500).json({ message: "Could not retrieve columns." });
//   }
// };

// export const getTasksByColumnId = async (req: Request, res: Response) => {
//   try {
//     const columnId = req.params.columnId;
//     const userId = req.userId;

//     const column = await ColumnModel.findById(columnId);
//     if (!column) {
//       return res.status(404).json({ message: "Column not found." });
//     }

//     const board = await BoardModel.findOne({
//       _id: column.boardId,
//       owner: userId,
//     });
//     if (!board) {
//       return res
//         .status(403)
//         .json({ message: "Forbidden: You do not have access to this board." });
//     }

//     const tasks = await TaskModel.find({ columnId: columnId }).lean();

//     // ✅ Корректно
//     res.json(tasks);
//   } catch (err) {
//     console.error("Error fetching tasks by column ID:", err);
//     // ✅ Корректно
//     res.status(500).json({ message: "Could not retrieve tasks." });
//   }
// };
