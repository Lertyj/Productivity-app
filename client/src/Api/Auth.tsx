async function login(email: string, password: string): Promise<boolean> {
  const response = await fetch("http://localhost:4444/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem("token", data.token);
    return true;
  }

  return false;
}

async function register(email: string, password: string): Promise<boolean> {
  const response = await fetch("http://localhost:4444/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return response.ok;
}

async function resetPassword(
  email: string,
  newPassword: string,
  reEnterPassword: string
): Promise<boolean> {
  const response = await fetch("http://localhost:4444/auth/resetpassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, newPassword, reEnterPassword }),
  });

  if (!response.ok) {
    const errorDetail = await response.json();
    console.error("Ошибка при сбросе пароля:", errorDetail);
    if (response.status === 403) {
      throw new Error("Нет доступа: проверьте свои права"); // Добавьте более подробную информацию об ошибке
    }
    throw new Error(errorDetail.message || "Неизвестная ошибка");
  }

  return response.ok;
}

export { login, register, resetPassword };
