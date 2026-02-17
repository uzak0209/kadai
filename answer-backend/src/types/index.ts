// ユーザー型定義
export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  created_at: Date;
}

// ToDo型定義
export interface Todo {
  id: number;
  user_id: number;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
}

// レスポンス用のUser型（パスワードを除く）
export type UserResponse = Omit<User, 'password'>;

// JWT Payload型定義
export interface JWTPayload {
  sub: number; // user id
  email: string;
}
