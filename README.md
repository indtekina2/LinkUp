# LinkUp

A full-stack chat application with authentication, group chats, and private conversations, built with React and Express/MongoDB.

> **Status:** Version 1 (REST-based). Real-time messaging via Socket.io is planned for Version 2 — see [Roadmap](#roadmap).

## Features

- **User authentication** — signup/login with JWT tokens and bcrypt-hashed passwords
- **Group conversations** — create password-protected groups, join existing ones
- **Private conversations** — start a 1:1 chat with any other user
- **Message history** — messages are persisted to MongoDB and loaded per conversation
- **Protected routes** — API endpoints require a valid JWT, verified via middleware

## Tech Stack

**Frontend**
- React 19 + Vite
- React Router
- Vanilla `fetch` for API calls (no external HTTP library)

**Backend**
- Express 5
- MongoDB with Mongoose
- JWT (`jsonwebtoken`) for auth
- `bcrypt` for password hashing

## Project Structure

```
LinkUp/
├── backend/
│   ├── Models/          # User, Conversation, Message schemas
│   ├── controllers/     # Route handlers (auth, groups, messages, users)
│   ├── middleware/      # JWT auth middleware
│   ├── config/          # DB connection
│   └── server.js        # Express app entry point
└── frontend/
    └── src/
        ├── Components/  # NavBar, Cards, Contact, Messages
        ├── Pages/       # Home, LogPage
        └── utils/       # API helper functions
```

## Getting Started

### Prerequisites
- Node.js
- A MongoDB instance (local or Atlas)

### Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Then run:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## API Overview

| Method | Endpoint                  | Auth required | Description                        |
|--------|----------------------------|:--:|-------------------------------------|
| POST   | `/api/signup`               |    | Register a new user                 |
| POST   | `/api/login`                 |    | Log in and receive a JWT            |
| GET    | `/api/protected`             | ✅ | Verify token validity               |
| GET    | `/api/current-user`          | ✅ | Get the logged-in user's info       |
| POST   | `/api/users`                  | ✅ | Get user info for a list of IDs     |
| POST   | `/api/create-group`          | ✅ | Create a new group conversation     |
| POST   | `/api/join-group`             | ✅ | Join a group with name + password   |
| POST   | `/api/join-conversation`     | ✅ | Start/open a private conversation   |
| POST   | `/api/conversations`         | ✅ | Get a conversation and its messages |
| POST   | `/api/messages/send`         | ✅ | Send a message to a conversation    |

## Known Limitations (v1)

- No real-time updates — messages only appear after a manual re-fetch/refresh, since there's no WebSocket layer yet
- No typing indicators or online/offline presence
- No message editing/deletion
- No pagination on message history

## Roadmap

- **v2:** Real-time messaging with Socket.io (rooms per conversation, JWT-authenticated socket connections, live message delivery, typing indicators, presence)
- Message pagination / infinite scroll
- Read receipts

## Author

Built by [indtekina](https://github.com/indtekina2)
