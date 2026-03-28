import React, { useState } from "react";
import { createBoard } from "../../../Api/Boards/boardsApi";
import { Board } from "../../../App/Types/Type";
import style from "./CreateBoardForm.module.css";
interface CreateBoardFormProps {
  onBoardCreated: (newBoard: Board) => void;
}

const CreateBoardForm: React.FC<CreateBoardFormProps> = ({
  onBoardCreated,
}) => {
  const [boardName, setBoardName] = useState("");

  const [error, setError] = useState<string | null>(null);

  const handleCreateBoard = async () => {
    if (!boardName.trim()) {
      setError("Название доски не может быть пустым.");
      return;
    }
    setError(null);

    try {
      const newBoard = await createBoard(boardName);
      onBoardCreated(newBoard);
      setBoardName("");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Произошла неизвестная ошибка.");
      }
    }
  };

  return (
    <div className={style.wrapper}>
      <h4>Create a new board</h4>
      <input
        className={style.input}
        type="text"
        value={boardName}
        onChange={(e) => setBoardName(e.target.value)}
        placeholder="Enter board name"
      />
      <button className={style.button} onClick={handleCreateBoard}>
        Create a board
      </button>

      {/* {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>} */}
    </div>
  );
};

export default CreateBoardForm;
