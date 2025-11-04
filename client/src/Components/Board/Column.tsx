import React, { useState } from "react";
import Task from "./Task";
import { ClientColumn, ClientTask, CreateTaskForm } from "../../App/Types/Type";

interface ColumnProps {
  column: ClientColumn;
  onAddTask: (form: CreateTaskForm) => Promise<void>;
  onEditColumn: (columnId: string, title: string) => void;
  onDeleteColumn: (columnId: string, boardId: string) => void;
  onEditTask: (task: ClientTask) => void;
  onDeleteTask: (taskId: string, columnId: string) => void;
}

const Column: React.FC<ColumnProps> = ({
  column,
  onAddTask,
  onEditColumn,
  onDeleteColumn,
  onEditTask,
  onDeleteTask,
}) => {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const maxOrder = column.taskIds.reduce(
      (max, task) => Math.max(max, task.order),
      -1
    );
    const order = maxOrder + 1;

    const form: CreateTaskForm = {
      title: newTaskTitle,
      description: newTaskDescription,
      columnId: column._id,
      boardId: column.boardId,
      order: order,
    };
    await onAddTask(form);
    setNewTaskTitle("");
    setNewTaskDescription("");
    setShowAddTaskForm(false);
  };

  return (
    <div className="w-80 bg-gray-100 rounded-lg p-4 flex flex-col flex-shrink-0 mr-4 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">{column.title}</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              const newTitle = prompt("Новое название колонки:", column.title);
              if (newTitle) onEditColumn(column._id, newTitle);
            }}
            className="text-blue-500 hover:text-blue-700 text-sm"
          >
            &#9998;
          </button>
          <button
            onClick={() => onDeleteColumn(column._id, column.boardId)}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            &#128465;
          </button>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto pr-2">
        {column.taskIds
          .sort((a, b) => a.order - b.order)
          .map((task) => (
            <Task
              key={task._id}
              task={task}
              onEditTask={onEditTask}
              onDeleteTask={onDeleteTask}
            />
          ))}
      </div>

      <button
        onClick={() => setShowAddTaskForm(!showAddTaskForm)}
        className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        {showAddTaskForm ? "Отмена" : "Добавить задачу"}
      </button>

      {showAddTaskForm && (
        <form onSubmit={handleAddTask} className="mt-3">
          <input
            type="text"
            placeholder="Название задачи"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <textarea
            placeholder="Описание задачи (необязательно)"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            rows={2}
            className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
          ></textarea>
          <button
            type="submit"
            className="w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Добавить
          </button>
        </form>
      )}
    </div>
  );
};

export default Column;
