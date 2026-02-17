.PHONY: up down build migrate seed logs clean restart help rebuild

# デフォルトターゲット
.DEFAULT_GOAL := help

# チェックサムファイル
CHECKSUM_FILE := .docker-checksum

# 監視対象ファイル
WATCHED_FILES := package.json package-lock.json Dockerfile docker-compose.yml tsconfig.json

# チェックサムを計算
current-checksum:
	@cat $(WATCHED_FILES) 2>/dev/null | shasum | cut -d' ' -f1 > $(CHECKSUM_FILE).tmp

# チェックサムを比較して変更があればリビルド
check-rebuild: current-checksum
	@if [ -f $(CHECKSUM_FILE) ]; then \
		if ! cmp -s $(CHECKSUM_FILE) $(CHECKSUM_FILE).tmp; then \
			echo "⚠️  設定ファイルに変更を検知しました。再ビルドします..."; \
			mv $(CHECKSUM_FILE).tmp $(CHECKSUM_FILE); \
			$(MAKE) rebuild; \
		else \
			rm $(CHECKSUM_FILE).tmp; \
		fi \
	else \
		mv $(CHECKSUM_FILE).tmp $(CHECKSUM_FILE); \
	fi

# すべてのコンテナを起動してマイグレーションを実行
up: check-rebuild
	@echo "🚀 コンテナを起動中..."
	docker compose up -d
	@echo "⏳ データベースの起動を待機中..."
	@sleep 5
	@echo "🔄 マイグレーションを実行中..."
	docker compose exec app npm run migrate
	@echo "🌱 シードデータを投入中..."
	docker compose exec app npm run seed
	@echo "✅ セットアップ完了！"
	@echo ""
	@echo "📝 アクセス先:"
	@echo "  - API: http://localhost:3000"
	@echo "  - Swagger UI: http://localhost:8080"
	@echo ""

# 設定ファイル変更時の再ビルド（変更があったコンテナのみ）
rebuild:
	@echo "🔄 変更されたコンテナを再ビルド中..."
	docker compose up -d --build
	@echo "✅ 再ビルド完了"

# コンテナを停止
down:
	@echo "🛑 コンテナを停止中..."
	docker compose down

# コンテナをビルドして起動
build:
	@echo "🔨 コンテナをビルド中..."
	docker compose up -d --build
	@echo "⏳ データベースの起動を待機中..."
	@sleep 5
	@echo "🔄 マイグレーションを実行中..."
	docker compose exec app npm run migrate
	@echo "🌱 シードデータを投入中..."
	docker compose exec app npm run seed
	@echo "✅ ビルド完了！"

# マイグレーションのみ実行
migrate:
	@echo "🔄 マイグレーションを実行中..."
	docker compose exec app npm run migrate

# シードデータのみ投入
seed:
	@echo "🌱 シードデータを投入中..."
	docker compose exec app npm run seed

# ログを表示
logs:
	docker compose logs -f

# アプリのログのみ表示
logs-app:
	docker compose logs -f app

# DBのログのみ表示
logs-db:
	docker compose logs -f db

# 完全クリーンアップ（ボリュームも削除）
clean:
	@echo "🧹 すべてのコンテナとボリュームを削除中..."
	docker compose down -v
	@echo "✅ クリーンアップ完了！"

# 再起動
restart:
	@echo "🔄 再起動中..."
	docker compose restart

# ヘルスチェック
health:
	@echo "🏥 ヘルスチェック中..."
	@curl -s http://localhost:3000/health | jq . || echo "APIが起動していません"

# コンテナの状態を確認
status:
	@echo "📊 コンテナの状態:"
	@docker compose ps

# ヘルプ
help:
	@echo "利用可能なコマンド:"
	@echo "  make up        - コンテナを起動（設定変更時は自動再ビルド）"
	@echo "  make down      - コンテナを停止"
	@echo "  make build     - コンテナをビルドして起動"
	@echo "  make rebuild   - 変更されたコンテナのみ再ビルド"
	@echo "  make migrate   - マイグレーションを実行"
	@echo "  make seed      - シードデータを投入"
	@echo "  make logs      - すべてのログを表示"
	@echo "  make logs-app  - アプリのログのみ表示"
	@echo "  make logs-db   - DBのログのみ表示"
	@echo "  make clean     - コンテナとボリュームを削除"
	@echo "  make restart   - コンテナを再起動"
	@echo "  make health    - APIのヘルスチェック"
	@echo "  make status    - コンテナの状態を確認"
	@echo "  make help      - このヘルプを表示"
