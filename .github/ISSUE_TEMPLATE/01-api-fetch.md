---
name: "課題1: API Fetch の基礎"
about: フロントエンドからAPIを呼び出す方法を学ぶ
title: "[課題1] API Fetchの実装"
labels: frontend, beginner
assignees: ''
---

## 📚 学習目標

- `fetch` APIの使い方を理解する
- 非同期処理 (`async/await`) の書き方を学ぶ
- エラーハンドリングの実装方法を理解する
- JSON形式でのデータ送受信を学ぶ

## 🎯 課題内容

`starter-frontend/lib/api.ts` の `fetchWithAuth` 関数を実装してください。

### 実装する機能

1. **基本的なfetch呼び出し**
   - `http://localhost:3000/api${url}` にリクエストを送る
   - `Content-Type: application/json` ヘッダーを設定
   - localStorageからJWTトークンを取得して `Authorization` ヘッダーに設定

2. **エラーハンドリング**
   - レスポンスが `ok` でない場合はエラーをthrow
   - ネットワークエラーをキャッチ

3. **JSONレスポンスのパース**
   - レスポンスボディを `response.json()` でパース
   - パースしたデータを返す

### ヒント

```typescript
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  // 1. localStorageからトークンを取得
  const token = localStorage.getItem('token')

  // 2. ヘッダーを構築
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  // 3. fetchを実行
  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  })

  // 4. エラーチェック
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Request failed')
  }

  // 5. JSONをパースして返す
  return response.json()
}
```

## ✅ 完了条件

- [ ] `fetchWithAuth` 関数が実装されている
- [ ] JWTトークンが正しくHeaderに含まれている
- [ ] エラー時に適切な例外がthrowされる
- [ ] ログインしてTodo一覧が取得できる

## 📖 参考資料

- [MDN: Fetch API](https://developer.mozilla.org/ja/docs/Web/API/Fetch_API)
- [MDN: async/await](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN: localStorage](https://developer.mozilla.org/ja/docs/Web/API/Window/localStorage)

## 🧪 テスト方法

1. http://localhost:3001 にアクセス
2. ログインページでテストユーザーでログイン
   - Email: `test@example.com`
   - Password: `password123`
3. Todo一覧ページが表示されればOK
