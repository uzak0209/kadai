---
name: "開始ガイド"
about: 課題を始める前に読んでください
title: "[開始] ToDoアプリ開発課題"
labels: documentation
assignees: ''
---

## 🎯 この課題について

この課題では、Next.js + TypeScript を使ったToDoアプリのフロントエンド開発を通じて、実践的なReact開発スキルを学びます。

## 📋 課題一覧

課題は以下の順番で進めることを推奨します：

### 1. [課題1: API Fetch の基礎](./01-api-fetch.md)
**難易度: ⭐️ 初級**

- fetch APIの使い方
- async/awaitでの非同期処理
- エラーハンドリング

**推定時間:** 30分〜1時間

### 2. [課題2: useState の使い方](./02-usestate-basics.md)
**難易度: ⭐️ 初級**

- Reactの状態管理
- useStateフックの使い方
- 配列・オブジェクトの更新

**推定時間:** 1時間〜2時間

### 3. [課題3: JWT認証の実装](./03-jwt-authentication.md)
**難易度: ⭐️⭐️ 中級**

- JWT認証の仕組み
- ログイン/ログアウト
- トークンの保存と管理
- 保護されたルート

**推定時間:** 2時間〜3時間

### 4. [課題4: コンポーネント設計](./04-component-architecture.md)
**難易度: ⭐️⭐️⭐️ 中級〜上級**

- コンポーネントの責務分離
- Props設計
- Presentational/Container パターン
- 再利用可能なコンポーネント

**推定時間:** 3時間〜5時間

## 🚀 セットアップ

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd kadai
```

### 2. 環境起動

```bash
# 課題用環境を起動
make up-frontend-kadai

# または選択メニューから
make
# → 7番を選択
```

起動後、以下のURLにアクセスできます：

- **課題用フロントエンド**: http://localhost:3001
- **完成版フロントエンド**: http://localhost:3002 （参考用）
- **完成版バックエンド**: http://localhost:3000
- **Swagger UI**: http://localhost:8080

### 3. テストユーザー

```
Email: test@example.com
Password: password123
```

## 📁 ディレクトリ構造

```
starter-frontend/          # ← ここを編集
├── app/
│   ├── login/
│   │   └── page.tsx      # ログインページ
│   ├── register/
│   │   └── page.tsx      # 登録ページ
│   └── todos/
│       └── page.tsx      # Todoページ
├── components/
│   ├── TodoItem.tsx      # Todoアイテム
│   └── TodoForm.tsx      # Todoフォーム
├── contexts/
│   └── AuthContext.tsx   # 認証Context
├── lib/
│   └── api.ts            # API関数
└── types/
    └── todo.ts           # 型定義
```

## 🎓 学習の進め方

### 1. 完成版を確認

まず完成版（http://localhost:3002）で動作を確認し、実装すべき機能を理解しましょう。

### 2. TODOコメントを探す

`starter-frontend` ディレクトリ内のファイルには `TODO:` コメントがあります。
これらが実装すべき箇所です。

```bash
# TODOを検索
grep -r "TODO:" starter-frontend/
```

### 3. 課題に取り組む

各課題のIssueを読み、指示に従って実装してください。

### 4. テストする

実装後、http://localhost:3001 で動作確認しましょう。

### 5. 完成版と比較

詰まったら `answer-frontend` ディレクトリの完成版コードを参考にしてください。

## 💡 ヒント

### DevToolsの活用

```javascript
// ブラウザのコンソールで確認
console.log(localStorage.getItem('token'))  // トークン確認

// Network タブ
// → API呼び出しのリクエスト/レスポンスを確認

// React DevTools
// → コンポーネントの状態を確認
```

### エラーが出たら

1. ブラウザのコンソールを確認
2. サーバーのログを確認: `make logs-answer-backend`
3. 完成版と比較
4. Swagger UI (http://localhost:8080) でAPI仕様を確認

## 📚 推奨学習リソース

- [React公式ドキュメント](https://react.dev/)
- [Next.js公式ドキュメント](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [MDN Web Docs](https://developer.mozilla.org/ja/)

## ✅ 全課題完了後

すべての課題を完了したら、以下を試してみましょう：

- [ ] オリジナル機能の追加（期限設定、カテゴリ分けなど）
- [ ] UIのカスタマイズ
- [ ] バリデーションの強化
- [ ] テストコードの追加
- [ ] パフォーマンスの最適化

## 🤝 質問・フィードバック

わからないことがあれば、遠慮なく質問してください！

Happy Coding! 🎉
