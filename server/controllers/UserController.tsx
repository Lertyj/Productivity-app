import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult, ValidationError } from "express-validator";
import UserModel, { UserDocument } from "../models/User";
import {
  RegisterRequestBody,
  LoginRequestBody,
  ResetPasswordRequestBody,
  UserResponseData,
  JwtPayload,
} from "../types/Type";
const JWT_SECRET = process.env.JWT_SECRET || "secret123";

type ControllerError = Error | unknown;

export const register = async (
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation Errors:", errors.array());
      res.status(400).json({
        success: false,
        error: errors.array().map((e: ValidationError) => e.msg as string),
      });
      return;
    }

    const { email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(409).json({
        success: false,
        message: "Пользователь с таким email уже существует.",
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email,
      passwordHash: hash,
    });

    const user: UserDocument = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id.toString(),
      },
      process.env.JWT_SECRET || "fallbackSecret",
      {
        expiresIn: "30d",
      }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });

    const { passwordHash, ...userData } = user.toObject();

    res.status(201).json({
      success: true,
      data: userData as UserResponseData,
      message: "Регистрация прошла успешно!",
    });
    return;
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({
      success: false,
      message: "Не удалось зарегистрироваться",
    });
    return;
  }
};

export const login = async (
  req: Request<{}, {}, LoginRequestBody>,
  res: Response
): Promise<void> => {
  try {
    const user: UserDocument | null = await UserModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      res.status(404).json({
        success: false,
        message: "Неверный логин или пароль",
      });
      return;
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user.passwordHash
    );

    if (!isValidPass) {
      res.status(401).json({
        success: false,
        message: "Неверный логин или пароль",
      });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET not defined");
    }

    const token = jwt.sign(
      {
        _id: user._id.toString(),
      } as JwtPayload,
      jwtSecret,
      {
        expiresIn: "30d",
      }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });

    const { passwordHash, ...userData } = user.toObject();
    res.json({
      success: true,
      data: userData as UserResponseData,
      message: "Успешная авторизация",
    });
    return;
  } catch (err: ControllerError) {
    console.error("Error during login:", err);
    res.status(500).json({
      success: false,
      message: "Не удалось авторизоваться",
    });
    return;
  }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({
        success: false,
        message: "Нет доступа. Пользователь не аутентифицирован.",
      });
      return;
    }

    const user: UserDocument | null = await UserModel.findById(req.userId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "Пользователь не найден",
      });
      return;
    }
    const { passwordHash, ...userData } = user.toObject();
    res.json({
      success: true,
      data: userData as UserResponseData,
    });
    return;
  } catch (err: ControllerError) {
    console.error("Error getting user data:", err);
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred.";
    res.status(500).json({
      success: false,
      message: "Нет доступа",
      error: errorMessage,
    });
    return;
  }
};

export const resetPassword = async (
  req: Request<{}, {}, ResetPasswordRequestBody>,
  res: Response
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        error: errors.array().map((e: ValidationError) => e.msg as string),
      });
      return;
    }

    const { email, reEnterPassword, newPassword } = req.body;

    const user: UserDocument | null = await UserModel.findOne({ email });
    if (!user) {
      res.status(404).json({
        success: false,
        message: "Пользователь не найден",
      });
      return;
    }

    if (newPassword !== reEnterPassword) {
      res.status(400).json({
        success: false,
        message: "Пароли должны совпадать",
      });
      return;
    }

    const isValidOldPass = await bcrypt.compare(newPassword, user.passwordHash);
    if (isValidOldPass) {
      res.status(400).json({
        success: false,
        message: "Новый пароль не должен совпадать со старым",
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    user.passwordHash = hash;
    await user.save();

    res.json({
      success: true,
      message: "Пароль успешно изменен",
    });
    return;
  } catch (err: ControllerError) {
    console.error("Error resetting password:", err);
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred.";
    res.status(500).json({
      success: false,
      message: "Не удалось изменить пароль",
      error: errorMessage,
    });
    return;
  }
};
