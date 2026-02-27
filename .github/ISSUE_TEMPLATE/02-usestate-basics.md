---
name: "課題2: useState の使い方"
about: Reactの状態管理の基礎を学ぶ
title: "[課題2] useStateで状態管理"
labels: frontend, beginner, react
assignees: ''
---

## 📚 学習目標

- `useState` フックの使い方を理解する
- 状態の更新方法を学ぶ
- フォーム入力の管理方法を理解する
- 配列やオブジェクトの状態更新を学ぶ

## 🎯 課題内容

`starter-frontend/app/todos/page.tsx` で状態管理を実装してください。

### 実装する状態

```typescript
const [todos, setTodos] = useState<Todo[]>([])        // Todo一覧
const [loading, setLoading] = useState(true)          // ローディング状態
const [error, setError] = useState('')                // エラーメッセージ
const [showForm, setShowForm] = useState(false)       // フォーム表示/非表示
const [editingTodo, setEditingTodo] = useState<Todo | null>(null)  // 編集中のTodo
```

### 実装する機能

#### 1. Todoの取得と表示

```typescript
const fetchTodos = useCallback(async () => {
  try {
    const data = await fetchWithAuth('/todos')
    setTodos(data)           // 取得したTodoをセット
    setLoading(false)        // ローディング完了
  } catch (err: any) {
    setError(err.message)    // エラーをセット
    setLoading(false)
  }
}, [])
```

#### 2. Todoの作成

```typescript
const handleCreateTodo = async (title: string, description: string) => {
  const newTodo = await fetchWithAuth('/todos', {
    method: 'POST',
    body: JSON.stringify({ title, description }),
  })

  // 既存の配列に新しいTodoを追加
  setTodos([...todos, newTodo])
}
```

#### 3. Todoの更新

```typescript
const handleUpdateTodo = async (id: number, title: string, description: string, completed: boolean) => {
  const updatedTodo = await fetchWithAuth(`/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ title, description, completed }),
  })

  // 該当のTodoだけ更新
  setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo))
}
```

#### 4. Todoの削除

```typescript
const handleDeleteTodo = async (id: number) => {
  await fetchWithAuth(`/todos/${id}`, { method: 'DELETE' })

  // 該当のTodoを除外
  setTodos(todos.filter(todo => todo.id !== id))
}
```

## 💡 重要ポイント

### 配列の状態更新

❌ **ダメな例（直接変更）**
```typescript
todos.push(newTodo)
setTodos(todos)  // 再レンダリングされない
```

✅ **良い例（新しい配列を作成）**
```typescript
setTodos([...todos, newTodo])  // スプレッド構文で新しい配列
```

### オブジェクトの状態更新

❌ **ダメな例**
```typescript
user.name = 'New Name'
setUser(user)  // 再レンダリングされない
```

✅ **良い例**
```typescript
setUser({ ...user, name: 'New Name' })
```

## ✅ 完了条件

- [ ] すべての状態が正しく定義されている
- [ ] Todoの一覧が表示される
- [ ] Todoを作成できる
- [ ] Todoを編集できる
- [ ] Todoを削除できる
- [ ] ローディング状態が正しく表示される
- [ ] エラーメッセージが表示される

## 📖 参考資料

- [React公式: useState](https://react.dev/reference/react/useState)
- [React公式: State の更新](https://react.dev/learn/updating-objects-in-state)
- [配列のイミュータブルな更新](https://react.dev/learn/updating-arrays-in-state)

## 🧪 テスト方法

1. http://localhost:3001/todos にアクセス
2. 以下の操作を試す：
   - ✅ Todo一覧が表示される
   - ✅ "Add Todo"ボタンでフォームが表示される
   - ✅ 新しいTodoを作成できる
   - ✅ チェックボックスで完了/未完了を切り替えられる
   - ✅ "Edit"ボタンで編集できる
   - ✅ "Delete"ボタンで削除できる
