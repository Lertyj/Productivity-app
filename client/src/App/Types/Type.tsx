export interface Task {
  title: string;
  description?: string;
  columnId: string;
  boardId: string;
  order: number;
}
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string | string[];
}
export interface Column {
  title: string;
  boardId: string;
  taskIds: string[];
  order: number;
}

export interface Board {
  _id?: string;
  title: string;
  userId: string;
  columnIds: string[];
}

export interface User {
  _id?: string;
  email: string;
  name?: string;
  avatarUrl?: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error?: string | string[];
}

export interface CreateBoardRequestBody {
  title: string;
}

export interface JwtPayload {
  _id: string;
}

export type ObjectIdString = string;

export interface ClientTask {
  _id: ObjectIdString;
  title: string;
  description?: string;
  order: number;
  columnId: ObjectIdString;
  boardId: ObjectIdString;
  createdAt: string;
  updatedAt: string;
}

export interface ClientColumn {
  _id: ObjectIdString;
  title: string;
  order: number;
  boardId: ObjectIdString;
  taskIds: ClientTask[];
  createdAt: string;
  updatedAt: string;
}

export interface ClientBoard {
  _id: ObjectIdString;
  title: string;
  description?: string;
  owner: ObjectIdString;
  columnIds: ClientColumn[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  message?: string;
  data?: T;
  error?: string | string[];
}

export interface CreateBoardForm {
  title: string;
  description?: string;
}

export interface CreateColumnForm {
  title: string;
  order: number;
  boardId: ObjectIdString;
}

export interface CreateTaskForm {
  title: string;
  description?: string;
  order: number;
  columnId: ObjectIdString;
  boardId: ObjectIdString;
}
