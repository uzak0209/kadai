# Hono ToDoアプリ API開発課題

## 概要
この課題では、HonoフレームワークとPostgreSQLを使用してRESTful APIを持つToDoアプリケーションのバックエンドを開発します。

## 目的
- Honoフレームワークの基本的な使い方を学ぶ
- RESTful APIの設計と実装
- PostgreSQLとの連携
- JWT認証の実装
- OpenAPI/Swagger仕様に基づいた開発

## 前提条件
- Docker & Docker Compose
- Node.js v18以上（ローカル開発の場合）
- TypeScriptの基礎知識

## セットアップ手順

### Docker を使用する場合（推奨）

#### クイックスタート（Makefileを使用）
```bash
make up
```

たったこれだけで以下が自動的に実行されます：
- コンテナの起動（PostgreSQL、API、Swagger UI）
- データベースのマイグレーション
- サンプルデータの投入

起動後、以下のURLにアクセスできます：
- **API**: http://localhost:3000
- **Swagger UI**: http://localhost:8080

**テストユーザー情報**（シードデータで自動作成）:
- Email: `test@example.com`
- Password: `password123`

#### その他の便利なコマンド
```bash
make down      # コンテナを停止
make build     # コンテナをビルドして起動
make seed      # シードデータを再投入
make logs      # ログを表示
make clean     # 完全クリーンアップ
make help      # すべてのコマンドを表示
```

#### 手動でセットアップする場合

1. コンテナの起動
```bash
docker-compose up -d
```

2. マイグレーションとシード投入
```bash
docker-compose exec app npm run migrate
docker-compose exec app npm run seed
```

3. 動作確認
```bash
curl http://localhost:3000/health
```

### ローカル環境で開発する場合

#### 1. 依存関係のインストール
```bash
npm install
```

#### 2. PostgreSQLのセットアップ
PostgreSQLをインストールし、データベースを作成してください。

```bash
createdb todo_app
```

#### 3. 環境変数の設定
`.env.example`をコピーして`.env`ファイルを作成し、必要な環境変数を設定してください。

```bash
cp .env.example .env
```

#### 4. マイグレーションの実行
```bash
npm run migrate
```

#### 5. サーバーの起動
```bash
npm run dev
```

サーバーは `http://localhost:3000` で起動します。

## 課題内容

### 必須機能
1. **ユーザー認証**
   - ユーザー登録 (POST /api/auth/register)
   - ログイン (POST /api/auth/login)
   - JWT認証の実装

2. **ToDo管理**
   - ToDo一覧取得 (GET /api/todos)
   - ToDo詳細取得 (GET /api/todos/:id)
   - ToDo作成 (POST /api/todos)
   - ToDo更新 (PUT /api/todos/:id)
   - ToDo削除 (DELETE /api/todos/:id)

### 実装要件
- すべてのエンドポイントは `docs/openapi.yaml` の仕様に従うこと
- ToDoエンドポイントはJWT認証が必要
- 適切なエラーハンドリングを実装すること
- レスポンスは適切なHTTPステータスコードを返すこと

## API仕様書
`docs/openapi.yaml` にOpenAPI 3.0形式で定義されています。

Docker環境で起動している場合、Swagger UIは自動的に起動しています。
ブラウザで `http://localhost:8080` を開いてください。

ローカル環境の場合は以下のコマンドで起動できます：
```bash
npm run swagger
```

## データベーススキーマ

### usersテーブル
| カラム名 | 型 | 制約 |
|---------|-----|------|
| id | SERIAL | PRIMARY KEY |
| email | VARCHAR(255) | UNIQUE, NOT NULL |
| password | VARCHAR(255) | NOT NULL |
| name | VARCHAR(100) | NOT NULL |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

### todosテーブル
| カラム名 | 型 | 制約 |
|---------|-----|------|
| id | SERIAL | PRIMARY KEY |
| user_id | INTEGER | FOREIGN KEY (users.id), NOT NULL |
| title | VARCHAR(200) | NOT NULL |
| description | TEXT | |
| completed | BOOLEAN | DEFAULT FALSE |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

## 評価ポイント
- [ ] OpenAPI仕様に準拠したAPIが実装されている
- [ ] JWT認証が正しく実装されている
- [ ] データベース操作が適切に実装されている
- [ ] エラーハンドリングが適切に行われている
- [ ] コードが読みやすく、適切に構造化されている

## ヒント
- Honoの公式ドキュメント: https://hono.dev/
- JWT認証には `hono/jwt` ミドルウェアを使用できます
- PostgreSQL接続には `pg` パッケージを使用してください
- パスワードのハッシュ化には `bcrypt` を使用してください

## 完了条件
- すべてのエンドポイントが正常に動作する
- Swagger UIからAPIをテストできる
- 認証が必要なエンドポイントで適切に認証チェックが行われている
