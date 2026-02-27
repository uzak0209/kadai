---
name: "課題3: JWT認証の実装"
about: JWTトークンを使った認証フローを学ぶ
title: "[課題3] JWT認証の実装"
labels: frontend, intermediate, authentication
assignees: ''
---

## 📚 学習目標

- JWT (JSON Web Token) の仕組みを理解する
- ログイン/ログアウトの実装方法を学ぶ
- トークンの保存と取得方法を理解する
- 認証状態の管理方法を学ぶ

## 🎯 課題内容

`starter-frontend/contexts/AuthContext.tsx` で認証機能を実装してください。

### JWT認証の流れ

```
1. ユーザーがログイン
   ↓
2. サーバーがJWTトークンを発行
   ↓
3. トークンをlocalStorageに保存
   ↓
4. 以降のリクエストでトークンをヘッダーに含める
   Authorization: Bearer <token>
   ↓
5. サーバーがトークンを検証
```

### 実装する機能

#### 1. ログイン機能

```typescript
const login = async (email: string, password: string) => {
  // 1. ログインAPIを呼び出す
  const response = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  const data = await response.json()

  // 2. トークンをlocalStorageに保存
  localStorage.setItem('token', data.token)

  // 3. ユーザー情報を状態にセット
  setUser(data.user)
}
```

#### 2. ログアウト機能

```typescript
const logout = () => {
  // 1. トークンを削除
  localStorage.removeItem('token')

  // 2. ユーザー状態をクリア
  setUser(null)

  // 3. ログインページにリダイレクト
  router.push('/login')
}
```

#### 3. トークン検証（アプリ起動時）

```typescript
useEffect(() => {
  const token = localStorage.getItem('token')
  if (token) {
    // トークンがある場合、ユーザー情報を取得
    fetch('http://localhost:3000/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(user => setUser(user))
      .catch(() => {
        // トークンが無効な場合は削除
        localStorage.removeItem('token')
      })
  }
  setLoading(false)
}, [])
```

#### 4. 保護されたルート

```typescript
// app/todos/page.tsx
useEffect(() => {
  if (!user) {
    router.push('/login')  // 未ログインならログインページへ
    return
  }
  fetchTodos()
}, [user, router, fetchTodos])
```

## 💡 重要ポイント

### トークンの保存場所

| 保存場所 | メリット | デメリット |
|---------|---------|-----------|
| **localStorage** | 簡単、永続的 | XSS攻撃に弱い |
| **sessionStorage** | タブを閉じると消える | XSS攻撃に弱い |
| **Cookie (HttpOnly)** | XSS攻撃に強い | CSRF対策が必要 |

### セキュリティ対策

```typescript
// ✅ 良い例: トークンの有効期限チェック
const isTokenValid = (token: string) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp * 1000 > Date.now()
  } catch {
    return false
  }
}

// ✅ 良い例: HTTPS通信のみで使用
if (window.location.protocol !== 'https:' && process.env.NODE_ENV === 'production') {
  console.warn('トークンはHTTPS通信でのみ使用してください')
}
```

## ✅ 完了条件

- [ ] ログイン機能が実装されている
- [ ] ログアウト機能が実装されている
- [ ] トークンがlocalStorageに保存される
- [ ] アプリ起動時にトークンを検証する
- [ ] 未ログイン時はログインページにリダイレクトする
- [ ] ログイン後はTodoページにリダイレクトする
- [ ] すべてのAPI呼び出しにトークンが含まれる

## 📖 参考資料

- [JWT.io - JWT入門](https://jwt.io/introduction)
- [localStorage API](https://developer.mozilla.org/ja/docs/Web/API/Window/localStorage)
- [React Context API](https://react.dev/reference/react/useContext)
- [Next.js認証のベストプラクティス](https://nextjs.org/docs/authentication)

## 🧪 テスト方法

### ログインテスト

1. http://localhost:3001/login にアクセス
2. テストユーザーでログイン
   - Email: `test@example.com`
   - Password: `password123`
3. ✅ Todoページにリダイレクトされる
4. ✅ ブラウザのDevToolsで `localStorage.getItem('token')` を確認

### 認証状態の確認

```javascript
// ブラウザのコンソールで実行
console.log(localStorage.getItem('token'))  // トークンが表示される

// トークンのペイロードを確認
const token = localStorage.getItem('token')
const payload = JSON.parse(atob(token.split('.')[1]))
console.log(payload)  // { sub: 1, email: "test@example.com", exp: ... }
```

### ログアウトテスト

1. "Logout"ボタンをクリック
2. ✅ ログインページにリダイレクトされる
3. ✅ `localStorage.getItem('token')` が `null` になる

### トークン検証テスト

1. ログインした状態でページをリロード
2. ✅ ログイン状態が保持される
3. DevToolsでlocalStorageからトークンを削除
4. ページをリロード
5. ✅ ログインページにリダイレクトされる
