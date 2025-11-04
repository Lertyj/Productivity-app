import React from "react";
import { ClientTask } from "../../App/Types/Type";

interface TaskProps {
  task: ClientTask;
  onEditTask: (task: ClientTask) => void;
  onDeleteTask: (taskId: string, columnId: string) => void;
}

const Task: React.FC<TaskProps> = ({ task, onEditTask, onDeleteTask }) => {
  return (
    <div className="bg-white p-3 rounded-md shadow-sm mb-3 cursor-grab">
      <h4 className="font-semibold text-gray-800">{task.title}</h4>
      {task.description && (
        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
      )}
      <div className="flex justify-end space-x-2 mt-2">
        <button
          onClick={() => onEditTask(task)}
          className="text-blue-500 hover:text-blue-700 text-sm"
        >
          Редактировать
        </button>
        <button
          onClick={() => onDeleteTask(task._id, task.columnId)}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default Task;
