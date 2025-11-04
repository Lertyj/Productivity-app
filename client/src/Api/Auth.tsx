async function login(email: string, password: string): Promise<boolean> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    await handleApiError(response, "при входе в систему");
    return false;
  }

  return true;
}

async function register(email: string, password: string): Promise<boolean> {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    await handleApiError(response, "при регистрации");
    return false;
  }

  return true;
}

async function handleApiError(response: Response, action: string) {
  if (response.status === 404) {
    throw new Error(
      `Ошибка 404: Маршрут API ${action} не найден. Проверьте конфигурацию Netlify.`
    );
  }

  let errorDetail: { message?: string } | null = null;

  try {
    errorDetail = await response.json();
  } catch (e) {
    throw new Error(
      `API вернул неожиданный формат (не JSON). Статус: ${response.status}.`
    );
  }

  const message = errorDetail?.message || "Неизвестная ошибка";

  if (response.status === 403) {
    throw new Error(`Нет доступа ${action}: проверьте свои права.`);
  }

  throw new Error(message);
}

async function resetPassword(
  email: string,
  newPassword: string,
  reEnterPassword: string
): Promise<boolean> {
  const response = await fetch("/api/auth/resetpassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, newPassword, reEnterPassword }),
  });

  if (!response.ok) {
    await handleApiError(response, "при сбросе пароля");
    return false;
  }

  return true;
}

export { login, register, resetPassword };
