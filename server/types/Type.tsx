import { Document, Types } from "mongoose";
import { UserDocument } from "../models/User";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export interface ITask {
  title: string;
  description?: string;
  columnId: Types.ObjectId;
  boardId: Types.ObjectId;
  order: number;
}
export interface ITaskDocument extends ITask, Document {}

export interface IColumn {
  title: string;
  boardId: Types.ObjectId;
  taskIds: Types.ObjectId[];
  order: number;
}
export interface IColumnDocument extends IColumn, Document {}

export interface IBoard {
  title: string;
  description?: string;
  owner: Types.ObjectId;
  columnIds: Types.ObjectId[];
}
export interface IBoardDocument extends IBoard, Document {}

export interface User {
  email: string;
  name?: string;
  avatarUrl?: string;
}

export interface RegisterRequestBody {
  email: string;
  password: string;
}
export interface LoginRequestBody {
  email: string;
  password: string;
}
export interface ResetPasswordRequestBody {
  email: string;
  newPassword: string;
  reEnterPassword: string;
}

export type UserResponseData = Omit<UserDocument, "passwordHash">;

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string | string[];
  message?: string;
}
export interface JwtPayload {
  _id: string;
}
export interface CreateBoardRequestBody {
  title: string;
  description?: string;
}
