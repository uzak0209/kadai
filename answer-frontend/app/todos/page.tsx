'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Todo } from '@/types/todo'
import TodoItem from '@/components/TodoItem'
import TodoForm from '@/components/TodoForm'
import { fetchWithAuth } from '@/lib/api'

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
  const { user, logout } = useAuth()
  const router = useRouter()

  const fetchTodos = useCallback(async () => {
    try {
      const data = await fetchWithAuth('/todos')
      setTodos(data)
      setLoading(false)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch todos')
      setLoading(false)

      // If unauthorized, redirect to login
      if (err.message?.includes('Unauthorized') || err.message?.includes('401')) {
        logout()
        router.push('/login')
      }
    }
  }, [logout, router])

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }

    fetchTodos()
  }, [user, router, fetchTodos])

  const handleCreateTodo = async (title: string, description: string) => {
    try {
      const newTodo = await fetchWithAuth('/todos', {
        method: 'POST',
        body: JSON.stringify({ title, description }),
      })

      setTodos([...todos, newTodo])
      setShowForm(false)
      setError('')
    } catch (err: any) {
      setError(err.message || 'Failed to create todo')
    }
  }

  const handleUpdateTodo = async (id: number, title: string, description: string, completed: boolean) => {
    try {
      const updatedTodo = await fetchWithAuth(`/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, description, completed }),
      })

      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)))
      setEditingTodo(null)
      setShowForm(false)
      setError('')
    } catch (err: any) {
      setError(err.message || 'Failed to update todo')
    }
  }

  const handleDeleteTodo = async (id: number) => {
    if (!confirm('Are you sure you want to delete this todo?')) {
      return
    }

    try {
      await fetchWithAuth(`/todos/${id}`, {
        method: 'DELETE',
      })

      setTodos(todos.filter((todo) => todo.id !== id))
      setError('')
    } catch (err: any) {
      setError(err.message || 'Failed to delete todo')
    }
  }

  const handleToggleComplete = async (id: number, completed: boolean) => {
    const todo = todos.find((t) => t.id === id)
    if (!todo) return

    try {
      const updatedTodo = await fetchWithAuth(`/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: todo.title,
          description: todo.description,
          completed,
        }),
      })

      setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)))
      setError('')
    } catch (err: any) {
      setError(err.message || 'Failed to toggle todo')
    }
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
                todo={editingTodo}
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
