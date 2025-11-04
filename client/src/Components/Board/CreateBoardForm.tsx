import React, { useState } from "react";
import { createBoard } from "../../Api/Boards/boardsApi";

const CreateBoardForm = () => {
  const [boardName, setBoardName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateBoard = async () => {
    if (!boardName.trim()) {
      setError("Название доски не может быть пустым.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const newBoard = await createBoard(boardName);
      console.log("Доска создана:", newBoard);

      setBoardName("");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Произошла неизвестная ошибка.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}
    >
      <h3>Создать новую доску</h3>
      {/* Поле ввода для названия доски */}
      <input
        type="text"
        value={boardName}
        onChange={(e) => setBoardName(e.target.value)}
        placeholder="Введите название доски"
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
          boxSizing: "border-box",
        }}
        disabled={isLoading}
      />
      {/* Кнопка для отправки формы */}
      <button
        onClick={handleCreateBoard}
        disabled={isLoading}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: isLoading ? "#666" : "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: isLoading ? "not-allowed" : "pointer",
        }}
      >
        {isLoading ? "Создание..." : "Создать доску"}
      </button>

      {/* Отображение сообщений об ошибках */}
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
};

export default CreateBoardForm;
