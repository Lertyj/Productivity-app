import { AuthResponse } from "../Context/Type";

const BASE_URL = process.env.REACT_APP_API_URL;
async function handleResponse(response: Response): Promise<AuthResponse> {
  try {
    const data = await response.json();

    if (!response.ok) {
      const data = await response.json();
      return {
        success: false,
        message: data.message || "Необходима авторизация",
      };
    }

    return {
      success: true,
      message: data.message || "Операция прошла успешно",
      data: data.data,
    };
  } catch (e) {
    return {
      success: false,
      message: "Ошибка обработки данных с сервера",
    };
  }
}

export async function login(
  email: string,
  password: string,
): Promise<AuthResponse> {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    return await handleResponse(response);
  } catch (error) {
    return { success: false, message: "Сервер недоступен" };
  }
}

export async function getMe(): Promise<AuthResponse> {
  try {
    const response = await fetch(`${BASE_URL}/auth/me`, {
      method: "GET",
      credentials: "include",
    });
    return await handleResponse(response);
  } catch (error) {
    return {
      success: false,
      message: "Не удалось проверить статус авторизации",
    };
  }
}

export async function register(
  email: string,
  password: string,
): Promise<AuthResponse> {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    return await handleResponse(response);
  } catch (error) {
    return { success: false, message: "Ошибка при регистрации" };
  }
}

export async function resetPassword(
  email: string,
  newPassword: string,
  reEnterPassword: string,
): Promise<AuthResponse> {
  try {
    const response = await fetch(`${BASE_URL}/auth/resetpassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword, reEnterPassword }),
      credentials: "include",
    });
    return await handleResponse(response);
  } catch (error) {
    return { success: false, message: "Ошибка при смене пароля" };
  }
}

export async function logoutApi(): Promise<AuthResponse> {
  try {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await handleResponse(response);

    return result;
  } catch (error) {
    return {
      success: false,
      message: "Ошибка при выходе из системы",
    };
  }
}
