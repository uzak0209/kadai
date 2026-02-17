# Answer Frontend - Todo Application

This is the complete implementation of the todo application built with Next.js, TypeScript, and Tailwind CSS. This serves as the answer key for the starter project.

## Features

- User authentication (login/register)
- JWT token management with localStorage
- Protected routes
- Todo CRUD operations (Create, Read, Update, Delete)
- Responsive design
- Error handling
- API integration with the backend

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

Open [http://localhost:3002](http://localhost:3002) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Docker

Build and run with Docker:

```bash
docker build -t answer-frontend .
docker run -p 3002:3002 answer-frontend
```

## Project Structure

```
answer-frontend/
├── app/
│   ├── login/           # Login page with full implementation
│   ├── register/        # Register page with full implementation
│   ├── todos/           # Todos page (protected) with full CRUD
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/
│   ├── TodoItem.tsx     # Todo item component
│   └── TodoForm.tsx     # Todo form component
├── contexts/
│   └── AuthContext.tsx  # Authentication context with full implementation
├── lib/
│   └── api.ts           # API utility functions
├── types/
│   ├── todo.ts          # Todo type definitions
│   └── user.ts          # User type definitions
└── public/              # Static assets
```

## Implementation Details

### Authentication Flow

1. **Registration**
   - User submits name, email, and password
   - API creates new user account
   - User is redirected to login page

2. **Login**
   - User submits email and password
   - API returns JWT token
   - Token is stored in localStorage
   - User profile is fetched and stored in context
   - User is redirected to todos page

3. **Protected Routes**
   - Todos page checks for authenticated user
   - Redirects to login if not authenticated
   - Token is included in all API requests

4. **Logout**
   - Token is removed from localStorage
   - User context is cleared
   - User is redirected to login page

### API Integration

All API calls use the `fetchWithAuth` utility function that:
- Retrieves token from localStorage
- Adds Authorization header with Bearer token
- Handles JSON serialization
- Provides error handling

### State Management

- **AuthContext**: Manages user authentication state
  - `user`: Current user object
  - `token`: JWT authentication token
  - `login(token)`: Saves token and fetches user profile
  - `logout()`: Clears authentication state
  - `isLoading`: Loading state for initial auth check

### Error Handling

- Network errors are caught and displayed to users
- Invalid tokens trigger logout and redirect to login
- Form validation prevents invalid submissions
- Confirmation dialogs for destructive actions (delete)

## API Endpoints

The backend API provides these endpoints:

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

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

## Key Differences from Starter

The starter project contains TODO comments where students need to implement:
1. Authentication context token persistence
2. Login/register API calls
3. Protected route logic
4. Todo CRUD operations
5. API utility functions

This answer project shows the complete implementation of all these features.

## Notes

- Runs on port 3002 (different from starter on 3001)
- Uses the same backend API as the starter project
- Includes proper error handling and user feedback
- All forms are validated before submission
- Tokens are verified on app load for persistent sessions
