import React, { useState, useEffect } from "react";
import Column from "./Column";
import {
  ClientBoard,
  ClientColumn,
  ClientTask,
  CreateColumnForm,
  CreateTaskForm,
  ApiResponse,
} from "../../App/Types/Type";

const getAuthToken = (): string | null => localStorage.getItem("token");

interface BoardProps {
  boardId: string;
}

const Board: React.FC<BoardProps> = ({ boardId }) => {
  const [board, setBoard] = useState<ClientBoard | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddColumnForm, setShowAddColumnForm] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");

  const BASE_URL = "/api";

  const fetchBoard = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const response = await fetch(`${BASE_URL}/boards/${boardId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData: ApiResponse<null> = await response.json();
        throw new Error(errorData.message || "Failed to fetch board");
      }

      const data: ClientBoard = await response.json();
      setBoard(data);
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred while fetching the board."
      );
      console.error("Fetch board error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddColumn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColumnTitle.trim() || !board) return;

    setLoading(true);
    try {
      const token = getAuthToken();
      if (!token) throw new Error("Authentication token not found.");

      const maxOrder = board.columnIds.reduce(
        (max, col) => Math.max(max, col.order),
        -1
      );
      const order = maxOrder + 1;

      const newColumn: CreateColumnForm = {
        title: newColumnTitle,
        boardId: board._id,
        order: order,
      };

      const response = await fetch(`${BASE_URL}/columns`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newColumn),
      });

      if (!response.ok) {
        const errorData: ApiResponse<null> = await response.json();
        throw new Error(errorData.message || "Failed to add column");
      }

      const addedColumn: ClientColumn = await response.json();
      setBoard((prevBoard) => {
        if (!prevBoard) return null;
        return {
          ...prevBoard,
          columnIds: [...prevBoard.columnIds, addedColumn],
        };
      });
      setNewColumnTitle("");
      setShowAddColumnForm(false);
    } catch (err: any) {
      setError(err.message || "An unknown error occurred while adding column.");
      console.error("Add column error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditColumn = async (columnId: string, newTitle: string) => {
    setLoading(true);
    try {
      const token = getAuthToken();
      if (!token) throw new Error("Authentication token not found.");

      const response = await fetch(`${BASE_URL}/columns/${columnId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTitle }),
      });

      if (!response.ok) {
        const errorData: ApiResponse<null> = await response.json();
        throw new Error(errorData.message || "Failed to update column");
      }

      const updatedColumn: ClientColumn = await response.json();
      setBoard((prevBoard) => {
        if (!prevBoard) return null;
        return {
          ...prevBoard,
          columnIds: prevBoard.columnIds.map((col) =>
            col._id === columnId ? { ...col, title: updatedColumn.title } : col
          ),
        };
      });
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred while updating column."
      );
      console.error("Edit column error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteColumn = async (columnId: string, boardId: string) => {
    if (
      !window.confirm(
        "Вы уверены, что хотите удалить эту колонку и все ее задачи?"
      )
    )
      return;
    setLoading(true);
    try {
      const token = getAuthToken();
      if (!token) throw new Error("Authentication token not found.");

      const response = await fetch(`${BASE_URL}/columns/${columnId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData: ApiResponse<null> = await response.json();
        throw new Error(errorData.message || "Failed to delete column");
      }

      setBoard((prevBoard) => {
        if (!prevBoard) return null;
        return {
          ...prevBoard,
          columnIds: prevBoard.columnIds.filter((col) => col._id !== columnId),
        };
      });
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred while deleting column."
      );
      console.error("Delete column error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (form: CreateTaskForm) => {
    setLoading(true);
    try {
      const token = getAuthToken();
      if (!token) throw new Error("Authentication token not found.");

      const response = await fetch(`${BASE_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData: ApiResponse<null> = await response.json();
        throw new Error(errorData.message || "Failed to add task");
      }

      const addedTask: ClientTask = await response.json();
      setBoard((prevBoard) => {
        if (!prevBoard) return null;
        return {
          ...prevBoard,
          columnIds: prevBoard.columnIds.map((col) =>
            col._id === form.columnId
              ? { ...col, taskIds: [...col.taskIds, addedTask] }
              : col
          ),
        };
      });
    } catch (err: any) {
      setError(err.message || "An unknown error occurred while adding task.");
      console.error("Add task error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditTask = async (task: ClientTask) => {
    const newTitle = prompt("Новое название задачи:", task.title);
    if (!newTitle) return;

    const newDescription = prompt(
      "Новое описание задачи:",
      task.description || ""
    );

    setLoading(true);
    try {
      const token = getAuthToken();
      if (!token) throw new Error("Authentication token not found.");

      const response = await fetch(`${BASE_URL}/tasks/${task._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTitle, description: newDescription }),
      });

      if (!response.ok) {
        const errorData: ApiResponse<null> = await response.json();
        throw new Error(errorData.message || "Failed to update task");
      }

      const updatedTask: ClientTask = await response.json();
      setBoard((prevBoard) => {
        if (!prevBoard) return null;
        return {
          ...prevBoard,
          columnIds: prevBoard.columnIds.map((col) => ({
            ...col,
            taskIds: col.taskIds.map((t) =>
              t._id === task._id
                ? {
                    ...t,
                    title: updatedTask.title,
                    description: updatedTask.description,
                  }
                : t
            ),
          })),
        };
      });
    } catch (err: any) {
      setError(err.message || "An unknown error occurred while updating task.");
      console.error("Edit task error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId: string, columnId: string) => {
    if (!window.confirm("Вы уверены, что хотите удалить эту задачу?")) return;
    setLoading(true);
    try {
      const token = getAuthToken();
      if (!token) throw new Error("Authentication token not found.");

      const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData: ApiResponse<null> = await response.json();
        throw new Error(errorData.message || "Failed to delete task");
      }

      setBoard((prevBoard) => {
        if (!prevBoard) return null;
        return {
          ...prevBoard,
          columnIds: prevBoard.columnIds.map((col) =>
            col._id === columnId
              ? {
                  ...col,
                  taskIds: col.taskIds.filter((task) => task._id !== taskId),
                }
              : col
          ),
        };
      });
    } catch (err: any) {
      setError(err.message || "An unknown error occurred while deleting task.");
      console.error("Delete task error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoard();
  }, [boardId]);

  if (loading) return <div className="text-center p-4">Загрузка доски...</div>;
  if (error)
    return <div className="text-center p-4 text-red-500">Ошибка: {error}</div>;
  if (!board) return <div className="text-center p-4">Доска не найдена.</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{board.title}</h1>
      {board.description && (
        <p className="text-gray-600 mb-6">{board.description}</p>
      )}

      <div className="flex overflow-x-auto pb-4">
        {board.columnIds
          .sort((a, b) => a.order - b.order)
          .map((column) => (
            <Column
              key={column._id}
              column={column}
              onAddTask={handleAddTask}
              onEditColumn={handleEditColumn}
              onDeleteColumn={handleDeleteColumn}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          ))}

        {/* Форма для добавления новой колонки */}
        <div className="w-80 flex-shrink-0 bg-gray-200 rounded-lg p-4 ml-4">
          <button
            onClick={() => setShowAddColumnForm(!showAddColumnForm)}
            className="w-full p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            {showAddColumnForm ? "Отмена" : "Добавить колонку"}
          </button>
          {showAddColumnForm && (
            <form onSubmit={handleAddColumn} className="mt-3">
              <input
                type="text"
                placeholder="Название новой колонки"
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
              <button
                type="submit"
                className="w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Создать колонку
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Board;
