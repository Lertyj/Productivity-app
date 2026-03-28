import { Router } from "express";
import * as BoardController from "../controllers/BoardController";

import checkAuth from "../utils/checkAuth";

const router = Router();

router.post("/boards", checkAuth, BoardController.createBoard);
router.get("/boards", checkAuth, BoardController.getUserBoards);

export default router;
