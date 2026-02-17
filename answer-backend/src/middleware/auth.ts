import { jwt } from 'hono/jwt';

// JWT認証ミドルウェア
export const authMiddleware = jwt({
  secret: process.env.JWT_SECRET || 'your-secret-key-change-this-in-production',
  alg: 'HS256',
});
