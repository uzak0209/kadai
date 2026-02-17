import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
          Todo App
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Welcome to your todo application
        </p>

        <div className="space-y-4">
          <Link
            href="/login"
            className="block w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition duration-200"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="block w-full bg-white hover:bg-gray-50 text-primary-600 font-semibold py-3 px-4 rounded-lg text-center border-2 border-primary-600 transition duration-200"
          >
            Register
          </Link>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Starter Project - Complete the TODOs to finish this app
        </p>
      </div>
    </main>
  )
}
