'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Todo } from '@/types/todo'
import TodoItem from '@/components/TodoItem'
import TodoForm from '@/components/TodoForm'
import { fetchWithAuth } from '@/lib/api'

export default function TodosPage() {
  // TODO: 課題2 - useStateで状態を定義してください
  // ヒント:
  // 1. todos: Todo[] - Todoの配列
  // 2. loading: boolean - ローディング状態
  // 3. error: string - エラーメッセージ
  // 4. showForm: boolean - フォーム表示フラグ
  // 5. editingTodo: Todo | null - 編集中のTodo
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
  const { user, logout } = useAuth()
  const router = useRouter()

  // TODO: 課題2 - fetchTodos関数を実装してください
  // ヒント:
  // 1. fetchWithAuth('/todos')でTodoを取得
  // 2. setTodos(data)で状態を更新
  // 3. setLoading(false)でローディング終了
  // 4. エラーハンドリングを忘れずに
  const fetchTodos = useCallback(async () => {
    console.log('fetchTodos not implemented')
    setLoading(false)
  }, [logout, router])

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }

    fetchTodos()
  }, [user, router, fetchTodos])

  // TODO: 課題2 - handleCreateTodo関数を実装してください
  // ヒント:
  // 1. fetchWithAuth('/todos', { method: 'POST', ... })でTodoを作成
  // 2. setTodos([...todos, newTodo])で配列に追加（イミュータブルな更新！）
  // 3. setShowForm(false)でフォームを閉じる
  const handleCreateTodo = async (title: string, description: string) => {
    console.log('handleCreateTodo not implemented', title, description)
  }

  // TODO: 課題2 - handleUpdateTodo関数を実装してください
  // ヒント:
  // 1. fetchWithAuth(`/todos/${id}`, { method: 'PUT', ... })でTodoを更新
  // 2. setTodos(todos.map(...))で配列を更新（イミュータブルな更新！）
  // 3. 該当するidのTodoだけを置き換える
  const handleUpdateTodo = async (id: number, title: string, description: string, completed: boolean) => {
    console.log('handleUpdateTodo not implemented', id, title, description, completed)
  }

  // TODO: 課題2 - handleDeleteTodo関数を実装してください
  // ヒント:
  // 1. confirmで確認ダイアログを表示
  // 2. fetchWithAuth(`/todos/${id}`, { method: 'DELETE' })で削除
  // 3. setTodos(todos.filter(...))で配列から削除（イミュータブルな更新！）
  const handleDeleteTodo = async (id: number) => {
    console.log('handleDeleteTodo not implemented', id)
  }

  // TODO: 課題2 - handleToggleComplete関数を実装してください
  // ヒント:
  // 1. todos.find()で該当するTodoを見つける
  // 2. fetchWithAuth(`/todos/${id}`, { method: 'PUT', ... })で更新
  // 3. completedだけ変更、title/descriptionは元のまま
  // 4. setTodos(todos.map(...))で配列を更新
  const handleToggleComplete = async (id: number, completed: boolean) => {
    console.log('handleToggleComplete not implemented', id, completed)
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">My Todos</h1>
              <p className="text-gray-600">Welcome, {user?.name || 'User'}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <button
            onClick={() => {
              setEditingTodo(null)
              setShowForm(!showForm)
            }}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
          >
            {showForm ? 'Cancel' : 'Add New Todo'}
          </button>

          {showForm && (
            <div className="mt-4">
              <TodoForm
                todo={editingTodo || undefined}
                onSubmit={(title, description, completed) => {
                  if (editingTodo) {
                    handleUpdateTodo(editingTodo.id, title, description, completed)
                  } else {
                    handleCreateTodo(title, description)
                  }
                }}
                onCancel={() => {
                  setShowForm(false)
                  setEditingTodo(null)
                }}
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          {todos.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
              No todos yet. Create one to get started!
            </div>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggleComplete={handleToggleComplete}
                onEdit={(todo) => {
                  setEditingTodo(todo)
                  setShowForm(true)
                }}
                onDelete={handleDeleteTodo}
              />
            ))
          )}
        </div>
      </div>
    </main>
  )
}
