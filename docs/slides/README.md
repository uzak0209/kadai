# Web開発基礎講座 - 講義スライド

超初心者向けのWeb開発基礎講座のスライド資料です。

## 内容

- Node.js とは
- React とは
- Next.js とは
- Hono とは
- データベース(PostgreSQL)とは
- JWT認証とは
- TypeScript の特徴
- Docker とは
- Git とは
- **GitHub Flow** (実践的な開発フロー)
  - Issue の作成と管理
  - ブランチを切る方法
  - Pull Request (PR) の作成
  - コードレビューの進め方
  - 実際の開発フロー例

## 使い方

### ブラウザで直接開く

```bash
# プロジェクトルートから
open docs/slides/index.html

# または、フルパスで
open /Users/uzak/Projects/kadai/docs/slides/index.html
```

### 簡易サーバーで開く（推奨）

Python 3がインストールされている場合:

```bash
cd docs/slides
python3 -m http.server 8000
```

その後、ブラウザで http://localhost:8000 を開く

### 操作方法

- **次のスライド**: `→` キーまたは `Space` キー
- **前のスライド**: `←` キー
- **全体表示**: `Esc` キー
- **フルスクリーン**: `F` キー
- **概要表示**: `Esc` キー（スライド一覧）

## 技術情報

- フレームワーク: [reveal.js](https://revealjs.com/) v4.6.1
- CDN経由で読み込むため、追加のインストール不要
- オフラインでは動作しない点に注意（CDN依存のため）

## カスタマイズ

スライドをカスタマイズしたい場合は、`index.html`を直接編集してください。

### テーマ変更

以下の行を変更することでテーマを変更できます:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.6.1/dist/theme/moon.css">
```

利用可能なテーマ:
- black（デフォルト）
- white
- league
- beige
- sky
- night
- serif
- simple
- solarized
- moon（現在使用中）

## ライセンス

このスライドはプロジェクトの一部として自由に使用・改変できます。
