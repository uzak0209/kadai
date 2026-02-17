import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function seed() {
  try {
    console.log('シードデータの投入を開始します...');

    // パスワードのハッシュ化
    const hashedPassword = await bcrypt.hash('password123', 10);

    // サンプルユーザーの作成
    const userResult = await pool.query(
      `INSERT INTO users (email, password, name)
       VALUES ($1, $2, $3)
       ON CONFLICT (email) DO NOTHING
       RETURNING id`,
      ['test@example.com', hashedPassword, 'テストユーザー']
    );

    if (userResult.rows.length > 0) {
      const userId = userResult.rows[0].id;
      console.log(`✓ ユーザーを作成しました (ID: ${userId})`);

      // サンプルToDoの作成
      const todos = [
        { title: '買い物に行く', description: '牛乳、パン、卵を買う', completed: false },
        { title: 'プロジェクトの資料作成', description: 'プレゼン資料を作成する', completed: false },
        { title: 'ジムに行く', description: '週3回の運動を継続する', completed: true },
        { title: 'メールの返信', description: '重要なメールに返信する', completed: false },
        { title: '書籍を読む', description: 'TypeScript本を読み進める', completed: false },
      ];

      for (const todo of todos) {
        await pool.query(
          `INSERT INTO todos (user_id, title, description, completed)
           VALUES ($1, $2, $3, $4)`,
          [userId, todo.title, todo.description, todo.completed]
        );
      }

      console.log(`✓ ${todos.length}件のToDoを作成しました`);
    } else {
      console.log('ℹ ユーザーは既に存在します');
    }

    console.log('');
    console.log('シードデータの投入が完了しました！');
    console.log('');
    console.log('テストユーザー情報:');
    console.log('  Email: test@example.com');
    console.log('  Password: password123');
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('シードデータの投入に失敗しました:', error);
    process.exit(1);
  }
}

seed();
