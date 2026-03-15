import React, { createContext, useContext, useState, useEffect } from "react";
import { login, register, resetPassword, getMe } from "../Api/Auth";

interface AuthContextType {
  isAuthenticated: boolean;
  loginUser: (email: string, password: string) => Promise<boolean>;
  registerUser: (email: string, password: string) => Promise<boolean>;
  resetPasswordUser: (
    email: string,
    newPassword: string,
    reEnterPassword: string
  ) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const checkToken = async () => {
    console.log("Проверяем статус авторизации...");
    const isLogged = await getMe();

    console.log("Результат проверки:", isLogged);

    setIsAuthenticated(isLogged);
    setIsLoading(false);
  };

  useEffect(() => {
    checkToken();
  }, []);

  const loginUser = async (email: string, password: string) => {
    const success = await login(email, password);
    setIsAuthenticated(success);
    return success;
  };

  const registerUser = async (email: string, password: string) => {
    const success = await register(email, password);
    return success;
  };

  const resetPasswordUser = async (
    email: string,
    newPassword: string,
    reEnterPassword: string
  ) => {
    try {
      const success = await resetPassword(email, newPassword, reEnterPassword);
      if (success) {
        console.log("Пароль успешно сброшен");
      } else {
        console.log("Не удалось сбросить пароль");
      }

      return success;
    } catch (error) {
      console.log("Ошибка при сбросе пароля:", error);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loginUser,
        registerUser,
        resetPasswordUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
