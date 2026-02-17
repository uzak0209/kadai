import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function migrate() {
  try {
    console.log('マイグレーションを開始します...');

    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf-8');

    await pool.query(schema);

    console.log('マイグレーションが完了しました！');
    process.exit(0);
  } catch (error) {
    console.error('マイグレーションに失敗しました:', error);
    process.exit(1);
  }
}

migrate();
