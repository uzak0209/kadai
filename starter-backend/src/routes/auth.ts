import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { pool } from '../db/pool';
import * as bcrypt from 'bcrypt';
import { sign } from 'hono/jwt';

const app = new Hono();

// バリデーションスキーマ
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// POST /api/auth/register
app.post('/register', zValidator('json', registerSchema), async (c) => {
  // TODO: ユーザー登録処理を実装してください
  // 1. リクエストボディから email, password, name を取得
  // 2. bcryptでパスワードをハッシュ化（saltRounds: 10）
  // 3. データベースにユーザーを保存
  // 4. JWTトークンを生成
  // 5. ユーザー情報とトークンを返す
  // 注意: メールアドレスが既に存在する場合は409エラーを返す

  return c.json({ error: '未実装です' }, 501);
});

// POST /api/auth/login
app.post('/login', zValidator('json', loginSchema), async (c) => {
  // TODO: ログイン処理を実装してください
  // 1. リクエストボディから email, password を取得
  // 2. メールアドレスでユーザーを検索
  // 3. bcryptでパスワードを検証
  // 4. JWTトークンを生成
  // 5. ユーザー情報とトークンを返す
  // 注意: 認証失敗時は401エラーを返す

  return c.json({ error: '未実装です' }, 501);
});

export default app;
