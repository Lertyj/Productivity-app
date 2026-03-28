import React, { useEffect, useState } from "react";
import { getMyBoards } from "../../../Api/Boards/boardsApi";
import { Board } from "../../../App/Types/Type";
import CreateBoardForm from "../CreateBoard/CreateBoardForm";
import style from "./BoardList.module.css";
const BoardList: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const fetchBoards = async () => {
    try {
      const data = await getMyBoards();
      setBoards(data);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Не удалось загрузить доски");
      }
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleBoardCreated = (newBoard: Board) => {
    setBoards((prev) => [...prev, newBoard]);
    setIsFormOpen(false);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <h3>My boards</h3>
        <button
          className={`${style.toggleBtn} ${isFormOpen ? style.active : ""}`}
          onClick={() => setIsFormOpen(!isFormOpen)}
        >
          <span className={`${style.line} ${style.line1}`}></span>
          <span className={`${style.line} ${style.line2}`}></span>
        </button>
      </div>
      <div
        className={`${style.formContainer} ${isFormOpen ? style.formVisible : ""}`}
      >
        <CreateBoardForm onBoardCreated={handleBoardCreated} />
      </div>

      <div className={style.list}>
        {boards.length > 0 ? (
          boards.map((board) => (
            <div key={board._id} className={style.board}>
              {board.title}
            </div>
          ))
        ) : (
          <p>You do not have any boards yet.</p>
        )}
      </div>
    </div>
  );
};
export default BoardList;
