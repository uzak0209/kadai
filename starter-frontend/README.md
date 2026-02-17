# Starter Frontend - Todo Application

This is a starter project for a todo application built with Next.js, TypeScript, and Tailwind CSS. The project contains incomplete implementations with TODOs for students to complete.

## Features to Implement

- [ ] User authentication (login/register)
- [ ] JWT token management with localStorage
- [ ] Protected routes
- [ ] Todo CRUD operations (Create, Read, Update, Delete)
- [ ] API integration with the backend

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Backend API running on `http://localhost:3000/api`

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file:

```bash
cp .env.example .env.local
```

3. Update the `.env.local` file with your API URL if needed.

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Docker

Build and run with Docker:

```bash
docker build -t starter-frontend .
docker run -p 3001:3001 starter-frontend
```

## Project Structure

```
starter-frontend/
├── app/
│   ├── login/           # Login page
│   ├── register/        # Register page
│   ├── todos/           # Todos page (protected)
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/
│   ├── TodoItem.tsx     # Todo item component
│   └── TodoForm.tsx     # Todo form component
├── contexts/
│   └── AuthContext.tsx  # Authentication context
├── lib/
│   └── api.ts           # API utility functions
├── types/
│   ├── todo.ts          # Todo type definitions
│   └── user.ts          # User type definitions
└── public/              # Static assets
```

## TODOs to Complete

Search for `TODO` comments in the codebase to find areas that need implementation:

### 1. Authentication Context (`contexts/AuthContext.tsx`)
- [ ] Implement token persistence with localStorage
- [ ] Implement login function
- [ ] Implement logout function
- [ ] Verify token on app load

### 2. API Utilities (`lib/api.ts`)
- [ ] Implement `fetchWithAuth` function
- [ ] Add proper error handling

### 3. Login Page (`app/login/page.tsx`)
- [ ] Implement login API call
- [ ] Handle authentication flow
- [ ] Redirect on success

### 4. Register Page (`app/register/page.tsx`)
- [ ] Implement registration API call
- [ ] Redirect to login on success

### 5. Todos Page (`app/todos/page.tsx`)
- [ ] Implement authentication check
- [ ] Implement fetch todos
- [ ] Implement create todo
- [ ] Implement update todo
- [ ] Implement delete todo
- [ ] Implement toggle complete

## API Endpoints

The backend API should provide these endpoints:

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Todos
- `GET /api/todos` - Get all todos (authenticated)
- `POST /api/todos` - Create todo (authenticated)
- `PUT /api/todos/:id` - Update todo (authenticated)
- `DELETE /api/todos/:id` - Delete todo (authenticated)

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Context** - State management

## Learning Objectives

By completing this project, you will learn:

1. JWT authentication in Next.js
2. Managing authentication state with React Context
3. Making authenticated API requests
4. Protected routes in Next.js App Router
5. CRUD operations with REST APIs
6. Form handling and validation
7. Error handling and user feedback

## Tips

- Start with the authentication flow (login/register)
- Use browser DevTools to inspect API requests/responses
- Test each feature thoroughly before moving to the next
- Use `console.log` for debugging
- Read the existing code to understand the structure

## Support

If you get stuck:
1. Read the comments and existing code
2. Check the API documentation
3. Use browser DevTools to debug
4. Ask for help from instructors

Good luck!
