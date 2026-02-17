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
  try {
    const payload = c.get('jwtPayload');
    const userId = payload.sub;

    const result = await pool.query(
      'SELECT id, user_id, title, description, completed, created_at, updated_at FROM todos WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    return c.json(result.rows);
  } catch (error) {
    console.error('Get todos error:', error);
    return c.json({ error: 'サーバーエラーが発生しました' }, 500);
  }
});

// GET /api/todos/:id - ToDo詳細取得
app.get('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const payload = c.get('jwtPayload');
    const userId = payload.sub;

    const result = await pool.query(
      'SELECT id, user_id, title, description, completed, created_at, updated_at FROM todos WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    if (result.rows.length === 0) {
      return c.json({ error: 'ToDoが見つかりません' }, 404);
    }

    return c.json(result.rows[0]);
  } catch (error) {
    console.error('Get todo error:', error);
    return c.json({ error: 'サーバーエラーが発生しました' }, 500);
  }
});

// POST /api/todos - ToDo作成
app.post('/', zValidator('json', createTodoSchema), async (c) => {
  try {
    const { title, description } = c.req.valid('json');
    const payload = c.get('jwtPayload');
    const userId = payload.sub;

    const result = await pool.query(
      'INSERT INTO todos (user_id, title, description, completed, created_at, updated_at) VALUES ($1, $2, $3, false, NOW(), NOW()) RETURNING id, user_id, title, description, completed, created_at, updated_at',
      [userId, title, description || null]
    );

    return c.json(result.rows[0], 201);
  } catch (error) {
    console.error('Create todo error:', error);
    return c.json({ error: 'サーバーエラーが発生しました' }, 500);
  }
});

// PUT /api/todos/:id - ToDo更新
app.put('/:id', zValidator('json', updateTodoSchema), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const updateData = c.req.valid('json');
    const payload = c.get('jwtPayload');
    const userId = payload.sub;

    // First, check if todo exists and belongs to user
    const checkResult = await pool.query(
      'SELECT id FROM todos WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    if (checkResult.rows.length === 0) {
      return c.json({ error: 'ToDoが見つかりません' }, 404);
    }

    // Build dynamic update query
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (updateData.title !== undefined) {
      updates.push(`title = $${paramCount}`);
      values.push(updateData.title);
      paramCount++;
    }

    if (updateData.description !== undefined) {
      updates.push(`description = $${paramCount}`);
      values.push(updateData.description);
      paramCount++;
    }

    if (updateData.completed !== undefined) {
      updates.push(`completed = $${paramCount}`);
      values.push(updateData.completed);
      paramCount++;
    }

    updates.push(`updated_at = NOW()`);

    values.push(id, userId);

    const result = await pool.query(
      `UPDATE todos SET ${updates.join(', ')} WHERE id = $${paramCount} AND user_id = $${paramCount + 1} RETURNING id, user_id, title, description, completed, created_at, updated_at`,
      values
    );

    return c.json(result.rows[0]);
  } catch (error) {
    console.error('Update todo error:', error);
    return c.json({ error: 'サーバーエラーが発生しました' }, 500);
  }
});

// DELETE /api/todos/:id - ToDo削除
app.delete('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const payload = c.get('jwtPayload');
    const userId = payload.sub;

    const result = await pool.query(
      'DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, userId]
    );

    if (result.rows.length === 0) {
      return c.json({ error: 'ToDoが見つかりません' }, 404);
    }

    return c.body(null, 204);
  } catch (error) {
    console.error('Delete todo error:', error);
    return c.json({ error: 'サーバーエラーが発生しました' }, 500);
  }
});

export default app;
