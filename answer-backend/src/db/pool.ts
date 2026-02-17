import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

// データベース接続プールを作成
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// 接続テスト
pool.on('connect', () => {
  console.log('データベースに接続しました');
});

pool.on('error', (err) => {
  console.error('データベース接続エラー:', err);
});
