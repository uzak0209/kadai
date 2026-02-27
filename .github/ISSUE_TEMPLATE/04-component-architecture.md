---
name: "課題4: コンポーネント設計"
about: Reactコンポーネントの設計思想を学ぶ
title: "[課題4] コンポーネント思想の理解"
labels: frontend, intermediate, react, architecture
assignees: ''
---

## 📚 学習目標

- コンポーネントの責務分離を理解する
- Props の設計方法を学ぶ
- 再利用可能なコンポーネントの作り方を理解する
- コンポーネントの粒度について学ぶ

## 🎯 課題内容

TodoアプリのコンポーネントをVery適切に分割し、再利用可能な設計にしてください。

## 📐 コンポーネント設計の原則

### 1. 単一責任の原則 (Single Responsibility Principle)

各コンポーネントは**1つの責務**だけを持つべき

❌ **悪い例: 1つのコンポーネントで全部やる**
```typescript
// TodoPage.tsx - 500行超える巨大コンポーネント
export default function TodoPage() {
  // 状態管理
  // API呼び出し
  // フォーム処理
  // リスト表示
  // エラー処理
  // ローディング表示
  // ...全部ここに書く
}
```

✅ **良い例: 責務ごとに分割**
```typescript
// app/todos/page.tsx - 全体の制御
// components/TodoList.tsx - リスト表示
// components/TodoItem.tsx - 1つのTodo表示
// components/TodoForm.tsx - フォーム
// components/LoadingSpinner.tsx - ローディング
// components/ErrorMessage.tsx - エラー表示
```

### 2. コンポーネントの分類

#### Presentational Component (見た目)

- UIの表示だけを担当
- 状態を持たない（propsで受け取る）
- 再利用しやすい

```typescript
// components/TodoItem.tsx
interface TodoItemProps {
  todo: Todo
  onToggleComplete: (id: number, completed: boolean) => void
  onEdit: (todo: Todo) => void
  onDelete: (id: number) => void
}

export default function TodoItem({ todo, onToggleComplete, onEdit, onDelete }: TodoItemProps) {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(e) => onToggleComplete(todo.id, e.target.checked)}
      />
      <span>{todo.title}</span>
      <button onClick={() => onEdit(todo)}>Edit</button>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  )
}
```

#### Container Component (ロジック)

- ビジネスロジックを担当
- 状態管理とAPI呼び出し
- Presentational Componentに渡す

```typescript
// app/todos/page.tsx
export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([])

  const handleToggleComplete = async (id: number, completed: boolean) => {
    // API呼び出しとロジック
  }

  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={handleToggleComplete}
          {...}
        />
      ))}
    </div>
  )
}
```

### 3. Props の設計

#### ✅ 良いProps設計

```typescript
// 明確な型定義
interface TodoFormProps {
  initialValues?: { title: string; description: string; completed: boolean }
  onSubmit: (title: string, description: string, completed: boolean) => void
  onCancel: () => void
  submitButtonText?: string  // デフォルト値あり
}

// 使用例
<TodoForm
  onSubmit={handleCreate}
  onCancel={() => setShowForm(false)}
/>

<TodoForm
  initialValues={editingTodo}
  onSubmit={handleUpdate}
  onCancel={() => setEditingTodo(null)}
  submitButtonText="Update"
/>
```

#### ❌ 避けるべきProps設計

```typescript
// 親の状態を直接渡す（密結合）
<TodoForm
  todos={todos}
  setTodos={setTodos}  // ❌ 親の状態を子が直接変更
/>

// 不明瞭なProps名
<TodoForm
  data={something}  // ❌ 何のデータ？
  callback={doSomething}  // ❌ 何をするコールバック？
/>
```

## 🏗️ 実装課題

### コンポーネント構造

```
app/todos/
└── page.tsx (Container)
    ├── <TodoList> (Presentational)
    │   └── <TodoItem> (Presentational)
    └── <TodoForm> (Presentational)

components/
├── TodoList.tsx
├── TodoItem.tsx
├── TodoForm.tsx
├── LoadingSpinner.tsx
└── ErrorMessage.tsx
```

### 実装するコンポーネント

#### 1. TodoList Component

```typescript
interface TodoListProps {
  todos: Todo[]
  loading: boolean
  onToggleComplete: (id: number, completed: boolean) => void
  onEdit: (todo: Todo) => void
  onDelete: (id: number) => void
}

export default function TodoList({ todos, loading, onToggleComplete, onEdit, onDelete }: TodoListProps) {
  if (loading) return <LoadingSpinner />
  if (todos.length === 0) return <EmptyState />

  return (
    <div className="space-y-4">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
```

#### 2. TodoForm Component (作成/編集共通)

```typescript
interface TodoFormProps {
  initialValues?: {
    title: string
    description: string
    completed: boolean
  }
  onSubmit: (title: string, description: string, completed: boolean) => void
  onCancel: () => void
  submitButtonText?: string
}

export default function TodoForm({
  initialValues,
  onSubmit,
  onCancel,
  submitButtonText = 'Create'
}: TodoFormProps) {
  const [title, setTitle] = useState(initialValues?.title || '')
  const [description, setDescription] = useState(initialValues?.description || '')
  const [completed, setCompleted] = useState(initialValues?.completed || false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(title, description, completed)
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* フォーム要素 */}
    </form>
  )
}
```

## ✅ 完了条件

- [ ] TodoList コンポーネントが分離されている
- [ ] TodoItem コンポーネントが再利用可能
- [ ] TodoForm コンポーネントが作成/編集で共通化されている
- [ ] LoadingSpinner コンポーネントが分離されている
- [ ] ErrorMessage コンポーネントが分離されている
- [ ] 各コンポーネントが明確な型定義を持つ
- [ ] Propsが適切に設計されている
- [ ] 状態管理がContainer Componentに集約されている

## 📖 参考資料

- [React公式: コンポーネントの考え方](https://react.dev/learn/thinking-in-react)
- [React公式: Props の受け渡し](https://react.dev/learn/passing-props-to-a-component)
- [コンポーネント設計のベストプラクティス](https://react.dev/learn/reusing-logic-with-custom-hooks)

## 🧪 テスト方法

### 再利用性のチェック

1. ✅ TodoFormが作成と編集で共通利用されている
2. ✅ TodoItemに別のスタイルを適用しても動作する
3. ✅ LoadingSpinnerを他のページでも使える

### Props の正しさをチェック

```typescript
// TypeScriptの型チェックが通る
<TodoItem
  todo={todo}
  onToggleComplete={handleToggle}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>

// ❌ 必須Propsが足りない場合はエラー
<TodoItem todo={todo} />  // Type error!
```

### コンポーネントの独立性をチェック

- ✅ TodoItemを別の画面でも使える
- ✅ TodoFormを新規作成と編集で共通化できる
- ✅ 親コンポーネントが変わっても子は影響を受けない
