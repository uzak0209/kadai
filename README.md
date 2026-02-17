# ToDoアプリ開発 総合課題

HonoとNext.jsを使用したフルスタックToDoアプリケーションの開発課題です。
バックエンドAPI開発とフロントエンド開発の両方を学習できます。

## 📁 プロジェクト構成

```
kadai/
├── answer-backend/          # 完成版バックエンド（参考用）
├── starter-backend/         # 未完成バックエンド（実装課題）
├── answer-frontend/         # 完成版フロントエンド（参考用）
├── starter-frontend/        # 未完成フロントエンド（実装課題）
├── shared/
│   └── docs/               # 共通API仕様書（OpenAPI/Swagger）
├── docker-compose.yml      # 全サービスのDocker構成
├── Makefile               # 便利なコマンド集
└── README.md              # このファイル
```

## 🎯 課題内容

### パターン1: バックエンド開発課題
`starter-backend`フォルダで、ToDoアプリのRESTful APIを実装します。

**学習内容:**
- Honoフレームワークの使い方
- RESTful API設計
- PostgreSQLとの連携
- JWT認証の実装
- OpenAPI仕様に基づいた開発

**参考:** `answer-backend`に完成版があります

### パターン2: フロントエンド開発課題
`starter-frontend`フォルダで、ToDoアプリのフロントエンドを実装します。

**学習内容:**
- Next.js App Routerの使い方
- JWT認証フロー
- API連携
- 状態管理
- TypeScriptでの型安全な開発

**参考:** `answer-frontend`に完成版があります

## 🚀 クイックスタート

### 前提条件
- Docker & Docker Compose
- Make（オプションだが推奨）

### 1. すべてのサービスを起動

```bash
make up
```

これで以下のサービスが起動します：

| サービス | URL | 説明 |
|---------|-----|------|
| 完成版バックエンド | http://localhost:3000 | 参考用完成版API |
| 未完成バックエンド | http://localhost:3010 | 実装課題用API |
| 完成版フロントエンド | http://localhost:3002 | 参考用完成版UI |
| 未完成フロントエンド | http://localhost:3001 | 実装課題用UI |
| Swagger UI | http://localhost:8080 | API仕様書 |
| PostgreSQL | localhost:5432 | データベース |

### 2. テストユーザーでログイン

シードデータとして以下のユーザーが自動作成されます：

- **Email:** `test@example.com`
- **Password:** `password123`

## 📖 課題の進め方

### バックエンド開発課題の場合

1. **完成版を確認**
   ```bash
   make up-answer
   ```
   - http://localhost:3002 で完成版UIを確認
   - http://localhost:3000/health で完成版APIを確認
   - http://localhost:8080 でAPI仕様を確認

2. **課題に取り組む**
   ```bash
   make up-starter
   ```
   - `starter-backend/src/`配下のファイルを編集
   - TODOコメントに従って実装
   - http://localhost:3010 でAPIをテスト

3. **詳細な手順**
   - `starter-backend/README.md`を参照

### フロントエンド開発課題の場合

1. **完成版を確認**
   ```bash
   make up-answer
   ```
   - http://localhost:3002 で完成版UIを確認
   - ログイン・ToDoのCRUD操作を試す

2. **課題に取り組む**
   ```bash
   # 完成版バックエンド + 未完成フロントエンド
   docker compose up -d db answer-backend starter-frontend
   ```
   - `starter-frontend/`配下のファイルを編集
   - TODOコメントに従って実装
   - http://localhost:3001 でUIをテスト

3. **詳細な手順**
   - `starter-frontend/README.md`を参照

## 🛠️ 便利なコマンド

### 起動パターン

```bash
make up            # すべてのサービスを起動
make up-answer     # 完成版のみ起動
make up-starter    # 未完成版（課題用）のみ起動
make up-backend    # バックエンドのみ起動
make up-frontend   # フロントエンドのみ起動
```

### 管理コマンド

```bash
make down          # すべてのサービスを停止
make restart       # 再起動
make build         # ビルドして起動
make clean         # データベース含めて完全削除
```

### データベース操作

```bash
make migrate       # マイグレーション実行
make seed          # シードデータ投入
```

### ログ確認

```bash
make logs                    # すべてのログ
make logs-answer-backend     # 完成版バックエンド
make logs-starter-backend    # 未完成版バックエンド
make logs-answer-frontend    # 完成版フロントエンド
make logs-starter-frontend   # 未完成版フロントエンド
make logs-db                 # データベース
```

### 状態確認

```bash
make status        # コンテナの状態確認
make health        # APIのヘルスチェック
make help          # すべてのコマンドを表示
```

## 📚 API仕様書

Swagger UIで確認できます: http://localhost:8080

OpenAPI仕様ファイル: `shared/docs/openapi.yaml`

### エンドポイント一覧

#### 認証
- `POST /api/auth/register` - ユーザー登録
- `POST /api/auth/login` - ログイン

#### ToDo（要JWT認証）
- `GET /api/todos` - ToDo一覧取得
- `GET /api/todos/:id` - ToDo詳細取得
- `POST /api/todos` - ToDo作成
- `PUT /api/todos/:id` - ToDo更新
- `DELETE /api/todos/:id` - ToDo削除

## 💾 データベース

### 接続情報
```
Host:     localhost
Port:     5432
Database: todo_app
User:     todouser
Password: todopass
```

### スキーマ

**usersテーブル**
| カラム名 | 型 | 制約 |
|---------|-----|------|
| id | SERIAL | PRIMARY KEY |
| email | VARCHAR(255) | UNIQUE, NOT NULL |
| password | VARCHAR(255) | NOT NULL |
| name | VARCHAR(100) | NOT NULL |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

**todosテーブル**
| カラム名 | 型 | 制約 |
|---------|-----|------|
| id | SERIAL | PRIMARY KEY |
| user_id | INTEGER | FOREIGN KEY (users.id) |
| title | VARCHAR(200) | NOT NULL |
| description | TEXT | |
| completed | BOOLEAN | DEFAULT FALSE |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

## 🎓 評価ポイント

### バックエンド
- [ ] OpenAPI仕様に準拠したAPIが実装されている
- [ ] JWT認証が正しく実装されている
- [ ] データベース操作が適切に実装されている
- [ ] エラーハンドリングが適切に行われている
- [ ] ユーザーは自分のToDoのみ操作できる

### フロントエンド
- [ ] JWT認証フローが正しく実装されている
- [ ] すべてのCRUD操作が動作する
- [ ] 適切なエラー表示が実装されている
- [ ] 保護されたルートが正しく機能する
- [ ] レスポンシブデザインになっている

## 🐛 トラブルシューティング

### ポートが既に使用されている
```bash
# 使用中のポートを確認
lsof -i :3000
lsof -i :3001
lsof -i :5432

# 必要に応じてプロセスを終了
kill -9 <PID>
```

### コンテナが起動しない
```bash
# ログを確認
make logs

# クリーンアップして再起動
make clean
make build
```

### データベースをリセットしたい
```bash
make clean          # データベースを含めて削除
make up             # 再起動
```

### マイグレーションエラー
```bash
# 手動でマイグレーション実行
docker compose exec answer-backend npm run migrate
```

## 📖 参考リソース

- [Hono公式ドキュメント](https://hono.dev/)
- [Next.js公式ドキュメント](https://nextjs.org/docs)
- [OpenAPI Specification](https://swagger.io/specification/)
- [PostgreSQL公式ドキュメント](https://www.postgresql.org/docs/)

## 📝 ライセンス

MIT License

## 🤝 サポート

課題で困ったら:
1. 完成版のコードを参考にする
2. Swagger UIでAPI仕様を確認
3. コンソールのエラーメッセージを確認
4. `make logs`でサーバーログを確認
