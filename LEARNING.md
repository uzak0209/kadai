# 📚 学習課題ガイド

ToDoアプリ開発を通じて、実践的なフロントエンド開発スキルを学びます。

## 🎯 課題一覧

### 開始前に
👉 [**開始ガイド**](.github/ISSUE_TEMPLATE/00-getting-started.md) - まずはこちらを読んでください

---

### 課題1: API Fetch の基礎 ⭐️
**推定時間:** 30分〜1時間

フロントエンドからバックエンドAPIを呼び出す方法を学びます。

**学ぶこと:**
- fetch APIの使い方
- async/awaitでの非同期処理
- エラーハンドリング
- JSON送受信

👉 [課題の詳細](.github/ISSUE_TEMPLATE/01-api-fetch.md)

---

### 課題2: useState の使い方 ⭐️
**推定時間:** 1時間〜2時間

Reactの状態管理の基礎を学びます。

**学ぶこと:**
- useStateフックの使い方
- 状態の更新方法
- 配列・オブジェクトのイミュータブルな更新
- フォーム入力の管理

👉 [課題の詳細](.github/ISSUE_TEMPLATE/02-usestate-basics.md)

---

### 課題3: JWT認証の実装 ⭐️⭐️
**推定時間:** 2時間〜3時間

JWTトークンを使った認証フローを実装します。

**学ぶこと:**
- JWT認証の仕組み
- ログイン/ログアウト機能
- localStorageでのトークン管理
- 保護されたルートの実装
- 認証状態の管理

👉 [課題の詳細](.github/ISSUE_TEMPLATE/03-jwt-authentication.md)

---

### 課題4: コンポーネント設計 ⭐️⭐️⭐️
**推定時間:** 3時間〜5時間

Reactコンポーネントの設計思想を学びます。

**学ぶこと:**
- 単一責任の原則
- Presentational/Container パターン
- Props設計
- 再利用可能なコンポーネント
- コンポーネントの粒度

👉 [課題の詳細](.github/ISSUE_TEMPLATE/04-component-architecture.md)

---

## 🚀 クイックスタート

```bash
# 1. 課題用環境を起動
make up-frontend-kadai

# 2. ブラウザでアクセス
# 課題用: http://localhost:3001
# 完成版: http://localhost:3002 (参考用)
# API仕様: http://localhost:8080

# 3. TODOコメントを検索
grep -r "TODO:" starter-frontend/

# 4. 実装開始！
```

## 📁 編集するファイル

```
starter-frontend/
├── lib/api.ts                 # 課題1: API呼び出し
├── app/todos/page.tsx         # 課題2: useState
├── contexts/AuthContext.tsx   # 課題3: JWT認証
└── components/               # 課題4: コンポーネント設計
    ├── TodoList.tsx
    ├── TodoItem.tsx
    └── TodoForm.tsx
```

## ✅ 学習チェックリスト

### 課題1: API Fetch
- [ ] fetchWithAuth関数の実装
- [ ] エラーハンドリング
- [ ] ログイン後にTodo一覧が表示される

### 課題2: useState
- [ ] 状態の定義と初期化
- [ ] Todoの取得と表示
- [ ] Todoの作成・更新・削除
- [ ] 配列のイミュータブルな更新

### 課題3: JWT認証
- [ ] login関数の実装
- [ ] logout関数の実装
- [ ] トークンの保存と取得
- [ ] アプリ起動時のトークン検証
- [ ] 保護されたルートの実装

### 課題4: コンポーネント設計
- [ ] TodoListコンポーネントの分離
- [ ] TodoItemコンポーネントの再利用性
- [ ] TodoFormの作成/編集共通化
- [ ] Props型定義
- [ ] Presentational/Containerの分離

## 💡 学習のコツ

### 1. 完成版を先に見る
まず `answer-frontend` の完成版コードを読んで、全体像を把握しましょう。

### 2. 小さく始める
一度に全部実装しようとせず、1つの機能ずつ確実に動かしましょう。

### 3. DevToolsを活用
- **Console**: ログ出力とエラー確認
- **Network**: API通信の確認
- **React DevTools**: 状態の確認
- **Application**: localStorageの確認

### 4. TypeScriptの型を活用
型エラーは実装のヒントです。型定義をよく読みましょう。

```typescript
// 型を確認
const handleToggleComplete: (id: number, completed: boolean) => void
```

## 🐛 トラブルシューティング

### エラーが出たら

1. **ブラウザのコンソールを確認**
   ```
   F12 → Console タブ
   ```

2. **サーバーログを確認**
   ```bash
   make logs-answer-backend
   ```

3. **API仕様を確認**
   ```
   http://localhost:8080 (Swagger UI)
   ```

4. **完成版と比較**
   ```bash
   diff starter-frontend/lib/api.ts answer-frontend/lib/api.ts
   ```

### よくある質問

**Q: undefinedエラーが出る**
```typescript
// ❌ 悪い例
const todo = todos[0]
console.log(todo.id)  // todosが空だとエラー

// ✅ 良い例
const todo = todos[0]
if (todo) {
  console.log(todo.id)
}
```

**Q: 状態が更新されない**
```typescript
// ❌ 悪い例: 直接変更
todos.push(newTodo)
setTodos(todos)

// ✅ 良い例: 新しい配列
setTodos([...todos, newTodo])
```

**Q: 無限ループが発生する**
```typescript
// ❌ 悪い例
useEffect(() => {
  fetchTodos()  // 依存配列なし
})

// ✅ 良い例
useEffect(() => {
  fetchTodos()
}, [])  // 空配列で初回のみ実行
```

## 📚 参考資料

### 公式ドキュメント
- [React公式](https://react.dev/)
- [Next.js公式](https://nextjs.org/docs)
- [TypeScript公式](https://www.typescriptlang.org/docs/)

### おすすめ記事
- [Reactの新しい公式ドキュメント](https://react.dev/learn)
- [TypeScriptハンドブック](https://www.typescriptlang.org/docs/handbook/intro.html)
- [MDN Web Docs - Fetch API](https://developer.mozilla.org/ja/docs/Web/API/Fetch_API)

## 🎉 完了後のチャレンジ

すべての課題を完了したら、以下に挑戦してみましょう：

### 機能追加
- [ ] Todo検索機能
- [ ] カテゴリ/タグ機能
- [ ] 期限設定と通知
- [ ] 優先度の設定
- [ ] 完了済みTodoの一括削除

### UI改善
- [ ] ダークモード対応
- [ ] アニメーション追加
- [ ] レスポンシブデザイン改善
- [ ] アクセシビリティ対応

### 技術的チャレンジ
- [ ] React QueryでのAPI状態管理
- [ ] Zodでのバリデーション
- [ ] Jestでのテスト追加
- [ ] Storybookでのコンポーネントカタログ

---

**Good Luck & Happy Coding! 🚀**
