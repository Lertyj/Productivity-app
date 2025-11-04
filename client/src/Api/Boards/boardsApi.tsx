interface Board {
  id: string;
  name: string;
  userId: string;
}

export const createBoard = async (boardName: string): Promise<Board> => {
  try {
    const response = await fetch("/api/boards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: boardName }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Ошибка при создании доски");
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
