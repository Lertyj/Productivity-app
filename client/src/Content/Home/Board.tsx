import React, { useState, useEffect } from "react";

import Board from "../../Components/Board/Board";

type BoardType = {
  _id: string;
  title: string;
};

function Boards() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const [boards, setBoards] = useState<BoardType[]>([]);

  const [currentBoardId, setCurrentBoardId] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  const [newBoardTitle, setNewBoardTitle] = useState<string>("");

  const handleLogin = () => {
    localStorage.setItem("token", "mock-auth-token-12345");
    setIsLoggedIn(true);
    setSuccessMessage("Вход выполнен успешно!");
  };

  const handleCreateBoard = () => {
    if (!newBoardTitle.trim()) {
      setError("Название доски не может быть пустым.");
      return;
    }

    const newBoard = {
      _id: Date.now().toString(),
      title: newBoardTitle,
    };

    setBoards((prevBoards) => [...prevBoards, newBoard]);
    setCurrentBoardId(newBoard._id);

    setShowCreateModal(false);
    setNewBoardTitle("");
    setSuccessMessage(`Доска "${newBoard.title}" успешно создана!`);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);

      const mockBoards: BoardType[] = [
        { _id: "1", title: "Задачи на неделю" },
        { _id: "2", title: "Проект 'Сайт'" },
      ];
      setBoards(mockBoards);
    }
    setLoading(false);
  }, []);

  const handleSelectBoard = (boardId: string) => {
    setCurrentBoardId(boardId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-xl text-gray-700">Загрузка...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <div className="text-2xl font-bold text-gray-800 mb-6">
          Добро пожаловать!
        </div>
        <div className="text-lg text-gray-600 mb-8 text-center max-w-sm">
          Чтобы начать, войдите в систему и создайте свою первую доску.
        </div>
        <button
          onClick={handleLogin}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Войти
        </button>
      </div>
    );
  }

  if (isLoggedIn && boards.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <div className="text-2xl font-bold text-gray-800 mb-6">
          У вас пока нет ни одной доски.
        </div>
        <div className="text-lg text-gray-600 mb-8">
          Создайте свою первую доску, чтобы начать работу.
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Создать доску
        </button>
        {/* Модальное окно для создания новой доски */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl w-96 transform scale-105 transition duration-300">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Создать новую доску
              </h3>
              <input
                type="text"
                value={newBoardTitle}
                onChange={(e) => setNewBoardTitle(e.target.value)}
                placeholder="Введите название доски"
                className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md transition duration-300"
                >
                  Отмена
                </button>
                <button
                  onClick={handleCreateBoard}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                >
                  Создать
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans text-gray-800">
      {/* Боковая панель для выбора досок */}
      <div className="w-1/4 p-6 bg-white border-r border-gray-200 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Мои доски</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            + Новая доска
          </button>
        </div>
        <ul className="space-y-2">
          {boards.map((board) => (
            <li
              key={board._id}
              onClick={() => handleSelectBoard(board._id)}
              className={`p-3 rounded-lg cursor-pointer transition duration-200 ease-in-out ${
                currentBoardId === board._id
                  ? "bg-blue-100 text-blue-700 font-bold shadow-sm"
                  : "bg-gray-50 hover:bg-gray-200"
              }`}
            >
              {board.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Основная область контента для выбранной доски */}
      <div className="flex-1 p-6">
        {currentBoardId ? (
          <Board boardId={currentBoardId} />
        ) : (
          <div className="flex items-center justify-center h-full text-2xl text-gray-400">
            Выберите доску, чтобы начать работу.
          </div>
        )}
      </div>

      {/* Модальное окно для создания новой доски */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96 transform scale-105 transition duration-300">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Создать новую доску
            </h3>
            <input
              type="text"
              value={newBoardTitle}
              onChange={(e) => setNewBoardTitle(e.target.value)}
              placeholder="Введите название доски"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowCreateModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md transition duration-300"
              >
                Отмена
              </button>
              <button
                onClick={handleCreateBoard}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
              >
                Создать
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно для сообщений об ошибке или успехе */}
      {(error || successMessage) && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div
            className={`bg-white p-6 rounded-lg shadow-xl w-96 transform scale-105 transition duration-300 ${
              error
                ? "border-l-4 border-red-500"
                : "border-l-4 border-green-500"
            }`}
          >
            <h3
              className={`text-xl font-bold mb-4 ${
                error ? "text-red-600" : "text-green-600"
              }`}
            >
              {error ? "Ошибка" : "Успех!"}
            </h3>
            <p className="text-gray-700 mb-4">{error || successMessage}</p>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setError(null);
                  setSuccessMessage(null);
                }}
                className={`font-bold py-2 px-4 rounded-md ${
                  error
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                ОК
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Boards;
