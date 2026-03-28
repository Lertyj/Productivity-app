const BASE_URL = process.env.REACT_APP_API_URL;
import { Board } from "../../App/Types/Type";
export const createBoard = async (boardName: string): Promise<Board> => {
  try {
    const response = await fetch(`${BASE_URL}/api/boards`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ title: boardName }),
    });

    if (!response.ok) {
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ошибка сервера");
      } else {
        const errorText = await response.text();
        console.error("Сервер вернул не JSON:", errorText.slice(0, 100));
        throw new Error(
          `Ошибка сервера: ${response.status} ${response.statusText}`,
        );
      }
    }

    const newBoard: Board = await response.json();

    return newBoard;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Ошибка:", error.message);

      throw error;
    } else {
      console.error("Произошла неизвестная ошибка:", error);

      throw new Error("Неизвестная ошибка");
    }
  }
};
export const getMyBoards = async (): Promise<Board[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/boards`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ошибка ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) throw error;
    throw new Error("Непредвиденная ошибка при получении досок");
  }
};
