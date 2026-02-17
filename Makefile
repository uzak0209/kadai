.PHONY: up down build migrate seed logs clean help select
.PHONY: up-answer up-starter up-backend up-frontend up-backend-kadai up-frontend-kadai
.PHONY: logs-answer-backend logs-starter-backend logs-answer-frontend logs-starter-frontend

# デフォルトターゲット
.DEFAULT_GOAL := select

# 起動オプションを選択
select:
	@echo "🎯 起動するサービスを選択してください:"
	@echo ""
	@echo "1️⃣  すべてのサービス (完成版 + 課題用)"
	@echo "2️⃣  完成版のみ (answer-backend + answer-frontend)"
	@echo "3️⃣  課題用のみ (starter-backend + starter-frontend)"
	@echo "4️⃣  バックエンドのみ (両方)"
	@echo "5️⃣  フロントエンドのみ (両方)"
	@echo "6️⃣  バックエンド課題 (answer-frontend + starter-backend)"
	@echo "7️⃣  フロントエンド課題 (answer-backend + starter-frontend)"
	@echo ""
	@read -p "番号を入力してください [1-7]: " choice; \
	case $$choice in \
		1) $(MAKE) up ;; \
		2) $(MAKE) up-answer ;; \
		3) $(MAKE) up-starter ;; \
		4) $(MAKE) up-backend ;; \
		5) $(MAKE) up-frontend ;; \
		6) $(MAKE) up-backend-kadai ;; \
		7) $(MAKE) up-frontend-kadai ;; \
		*) echo "❌ 無効な選択です"; exit 1 ;; \
	esac

# すべてのサービスを起動
up:
	@echo "🚀 すべてのサービスを起動中..."
	docker compose up -d
	@echo "⏳ データベースの起動を待機中..."
	@sleep 5
	@echo "🔄 マイグレーションを実行中（answer-backend）..."
	docker compose exec answer-backend npm run migrate
	@echo "🌱 シードデータを投入中（answer-backend）..."
	docker compose exec answer-backend npm run seed
	@echo "✅ セットアップ完了！"
	@echo ""
	@echo "📝 アクセス先:"
	@echo "  🔵 完成版バックエンド:     http://localhost:3000"
	@echo "  🟢 未完成バックエンド:     http://localhost:3010"
	@echo "  🎨 完成版フロントエンド:   http://localhost:3002"
	@echo "  🎨 未完成フロントエンド:   http://localhost:3001"
	@echo "  📚 Swagger UI:             http://localhost:8080"
	@echo ""
	@echo "🧪 テストユーザー:"
	@echo "  Email:    test@example.com"
	@echo "  Password: password123"
	@echo ""

# 完成版のみ起動
up-answer:
	@echo "🚀 完成版サービスを起動中..."
	docker compose up -d db swagger answer-backend answer-frontend
	@echo "⏳ データベースの起動を待機中..."
	@sleep 5
	@echo "🔄 マイグレーションを実行中..."
	docker compose exec answer-backend npm run migrate
	@echo "🌱 シードデータを投入中..."
	docker compose exec answer-backend npm run seed
	@echo "✅ 完成版の起動完了！"
	@echo ""
	@echo "📝 アクセス先:"
	@echo "  🔵 バックエンド:   http://localhost:3000"
	@echo "  🎨 フロントエンド: http://localhost:3002"
	@echo "  📚 Swagger UI:     http://localhost:8080"
	@echo ""

# 未完成版のみ起動
up-starter:
	@echo "🚀 未完成版（課題用）サービスを起動中..."
	docker compose up -d db swagger starter-backend starter-frontend
	@echo "⏳ データベースの起動を待機中..."
	@sleep 5
	@echo "🔄 マイグレーションを実行中..."
	docker compose exec starter-backend npm run migrate
	@echo "🌱 シードデータを投入中..."
	docker compose exec starter-backend npm run seed
	@echo "✅ 課題用サービスの起動完了！"
	@echo ""
	@echo "📝 アクセス先:"
	@echo "  🔵 バックエンド:   http://localhost:3010"
	@echo "  🎨 フロントエンド: http://localhost:3001"
	@echo "  📚 Swagger UI:     http://localhost:8080"
	@echo ""

# バックエンドのみ起動
up-backend:
	@echo "🚀 バックエンドサービスを起動中..."
	docker compose up -d db swagger answer-backend starter-backend
	@echo "⏳ データベースの起動を待機中..."
	@sleep 5
	@echo "🔄 マイグレーションを実行中..."
	docker compose exec answer-backend npm run migrate
	@echo "🌱 シードデータを投入中..."
	docker compose exec answer-backend npm run seed
	@echo "✅ バックエンドの起動完了！"
	@echo ""
	@echo "📝 アクセス先:"
	@echo "  🔵 完成版バックエンド:   http://localhost:3000"
	@echo "  🟢 未完成バックエンド:   http://localhost:3010"
	@echo "  📚 Swagger UI:           http://localhost:8080"
	@echo ""

# フロントエンドのみ起動
up-frontend:
	@echo "🚀 フロントエンドサービスを起動中..."
	docker compose up -d answer-frontend starter-frontend
	@echo "✅ フロントエンドの起動完了！"
	@echo ""
	@echo "📝 アクセス先:"
	@echo "  🎨 完成版フロントエンド:   http://localhost:3002"
	@echo "  🎨 未完成フロントエンド:   http://localhost:3001"
	@echo ""

# バックエンド開発課題（完成版フロントエンド + 未完成バックエンド）
up-backend-kadai:
	@echo "🚀 バックエンド開発課題環境を起動中..."
	docker compose up -d db swagger starter-backend answer-frontend
	@echo "⏳ データベースの起動を待機中..."
	@sleep 5
	@echo "🔄 マイグレーションを実行中..."
	docker compose exec starter-backend npm run migrate
	@echo "🌱 シードデータを投入中..."
	docker compose exec starter-backend npm run seed
	@echo "✅ バックエンド開発課題環境の起動完了！"
	@echo ""
	@echo "📝 アクセス先:"
	@echo "  🟢 課題用バックエンド:     http://localhost:3010  ← ここを実装"
	@echo "  🎨 完成版フロントエンド:   http://localhost:3002  ← 動作確認用"
	@echo "  📚 Swagger UI:             http://localhost:8080  ← API仕様"
	@echo ""
	@echo "💡 ヒント:"
	@echo "  - starter-backend/src/ 配下を編集してAPIを実装"
	@echo "  - フロントエンドで動作確認できます"
	@echo ""

# フロントエンド開発課題（完成版バックエンド + 未完成フロントエンド）
up-frontend-kadai:
	@echo "🚀 フロントエンド開発課題環境を起動中..."
	docker compose up -d db swagger answer-backend starter-frontend
	@echo "⏳ データベースの起動を待機中..."
	@sleep 5
	@echo "🔄 マイグレーションを実行中..."
	docker compose exec answer-backend npm run migrate
	@echo "🌱 シードデータを投入中..."
	@echo "✅ フロントエンド開発課題環境の起動完了！"
	docker compose exec answer-backend npm run seed
	@echo ""
	@echo "📝 アクセス先:"
	@echo "  🔵 完成版バックエンド:     http://localhost:3000  ← APIは完成済み"
	@echo "  🎨 課題用フロントエンド:   http://localhost:3001  ← ここを実装"
	@echo "  📚 Swagger UI:             http://localhost:8080  ← API仕様"
	@echo ""
	@echo "💡 ヒント:"
	@echo "  - starter-frontend/ 配下を編集してUIを実装"
	@echo "  - バックエンドAPIは完成しているので自由に使えます"
	@echo ""

# すべてのサービスを停止
down:
	@echo "🛑 すべてのサービスを停止中..."
	docker compose down

# すべてのサービスをビルドして起動
build:
	@echo "🔨 すべてのサービスをビルド中..."
	docker compose up -d --build
	@echo "⏳ データベースの起動を待機中..."
	@sleep 5
	@echo "🔄 マイグレーションを実行中..."
	docker compose exec answer-backend npm run migrate
	@echo "🌱 シードデータを投入中..."
	docker compose exec answer-backend npm run seed
	@echo "✅ ビルド完了！"

# マイグレーション実行（answer-backend）
migrate:
	@echo "🔄 マイグレーションを実行中（answer-backend）..."
	docker compose exec answer-backend npm run migrate

# シードデータ投入（answer-backend）
seed:
	@echo "🌱 シードデータを投入中（answer-backend）..."
	docker compose exec answer-backend npm run seed

# すべてのログを表示
logs:
	docker compose logs -f

# 完成版バックエンドのログ
logs-answer-backend:
	docker compose logs -f answer-backend

# 未完成版バックエンドのログ
logs-starter-backend:
	docker compose logs -f starter-backend

# 完成版フロントエンドのログ
logs-answer-frontend:
	docker compose logs -f answer-frontend

# 未完成版フロントエンドのログ
logs-starter-frontend:
	docker compose logs -f starter-frontend

# DBのログ
logs-db:
	docker compose logs -f db

# 完全クリーンアップ
clean:
	@echo "🧹 すべてのコンテナとボリュームを削除中..."
	docker compose down -v
	@echo "✅ クリーンアップ完了！"

# 再起動
restart:
	@echo "🔄 すべてのサービスを再起動中..."
	docker compose restart

# ヘルスチェック
health:
	@echo "🏥 ヘルスチェック中..."
	@echo "\n完成版バックエンド:"
	@curl -s http://localhost:3000/health | jq . 2>/dev/null || echo "起動していません"
	@echo "\n未完成版バックエンド:"
	@curl -s http://localhost:3010/health | jq . 2>/dev/null || echo "起動していません"

# コンテナの状態を確認
status:
	@echo "📊 コンテナの状態:"
	@docker compose ps

# ヘルプ
help:
	@echo "📖 利用可能なコマンド:"
	@echo ""
	@echo "🚀 起動コマンド:"
	@echo "  make up            - すべてのサービスを起動"
	@echo "  make up-answer     - 完成版のみ起動"
	@echo "  make up-starter    - 未完成版（課題用）のみ起動"
	@echo "  make up-backend    - バックエンドのみ起動"
	@echo "  make up-frontend   - フロントエンドのみ起動"
	@echo ""
	@echo "🛑 停止・管理:"
	@echo "  make down          - すべてのサービスを停止"
	@echo "  make restart       - すべてのサービスを再起動"
	@echo "  make build         - すべてをビルドして起動"
	@echo "  make clean         - コンテナとボリュームを削除"
	@echo ""
	@echo "💾 データベース:"
	@echo "  make migrate       - マイグレーションを実行"
	@echo "  make seed          - シードデータを投入"
	@echo ""
	@echo "📋 ログ確認:"
	@echo "  make logs                    - すべてのログを表示"
	@echo "  make logs-answer-backend     - 完成版バックエンドのログ"
	@echo "  make logs-starter-backend    - 未完成版バックエンドのログ"
	@echo "  make logs-answer-frontend    - 完成版フロントエンドのログ"
	@echo "  make logs-starter-frontend   - 未完成版フロントエンドのログ"
	@echo "  make logs-db                 - DBのログ"
	@echo ""
	@echo "🔍 確認:"
	@echo "  make health        - APIのヘルスチェック"
	@echo "  make status        - コンテナの状態を確認"
	@echo "  make help          - このヘルプを表示"
