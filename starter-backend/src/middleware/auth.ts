import { Context, Next } from 'hono';
import { jwt } from 'hono/jwt';

// TODO: JWT認証ミドルウェアを実装してください
// ヒント: hono/jwtのjwtミドルウェアを使用できます
// 環境変数JWT_SECRETを使用してください

export const authMiddleware = async (c: Context, next: Next) => {
  // ここに実装してください
  await next();
};
