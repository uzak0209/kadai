import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { pool } from '../db/pool';
import { authMiddleware } from '../middleware/auth';

const app = new Hono();

// すべてのルートに認証を適用
app.use('/*', authMiddleware);

// バリデーションスキーマ
const createTodoSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().optional(),
});

const updateTodoSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});

// GET /api/todos - ToDo一覧取得
app.get('/', async (c) => {
  // TODO: ログインユーザーのToDo一覧を取得
  // 1. JWTペイロードからユーザーIDを取得（c.get('jwtPayload')）
  // 2. データベースから該当ユーザーのToDoを全件取得
  // 3. 結果を返す

  return c.json({ error: '未実装です' }, 501);
});

// GET /api/todos/:id - ToDo詳細取得
app.get('/:id', async (c) => {
  // TODO: 指定されたIDのToDoを取得
  // 1. パスパラメータからIDを取得
  // 2. JWTペイロードからユーザーIDを取得
  // 3. データベースから該当のToDoを取得
  // 4. ユーザー自身のToDoかチェック
  // 5. 結果を返す
  // 注意: ToDoが存在しないまたは他人のToDoの場合は404を返す

  return c.json({ error: '未実装です' }, 501);
});

// POST /api/todos - ToDo作成
app.post('/', zValidator('json', createTodoSchema), async (c) => {
  // TODO: ToDoを新規作成
  // 1. リクエストボディから title, description を取得
  // 2. JWTペイロードからユーザーIDを取得
  // 3. データベースに新しいToDoを保存
  // 4. 作成されたToDoを返す（ステータス201）

  return c.json({ error: '未実装です' }, 501);
});

// PUT /api/todos/:id - ToDo更新
app.put('/:id', zValidator('json', updateTodoSchema), async (c) => {
  // TODO: ToDoを更新
  // 1. パスパラメータからIDを取得
  // 2. リクエストボディから更新データを取得
  // 3. JWTペイロードからユーザーIDを取得
  // 4. データベースの該当ToDoを更新
  // 5. ユーザー自身のToDoかチェック
  // 6. 更新されたToDoを返す
  // 注意: ToDoが存在しないまたは他人のToDoの場合は404を返す

  return c.json({ error: '未実装です' }, 501);
});

// DELETE /api/todos/:id - ToDo削除
app.delete('/:id', async (c) => {
  // TODO: ToDoを削除
  // 1. パスパラメータからIDを取得
  // 2. JWTペイロードからユーザーIDを取得
  // 3. データベースから該当のToDoを削除
  // 4. ユーザー自身のToDoかチェック
  // 5. ステータス204を返す
  // 注意: ToDoが存在しないまたは他人のToDoの場合は404を返す

  return c.json({ error: '未実装です' }, 501);
});

export default app;
