import "next";
import { UserDocument } from "./models/User";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
declare module "next" {
  interface NextApiRequest {
    userId?: string;
  }
}

export interface RegisterRequestBody {
  email: string;
  fullName: string;
  password: string;
  avatarUrl?: string;
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

export type UserResponseData = Omit<
  UserDocument,
  "passwordHash" | "createdAt" | "updatedAt"
> & {
  createdAt: string;
  updatedAt: string;
};

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string | string[];
  message?: string;
}
