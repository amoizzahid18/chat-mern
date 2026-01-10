# Chat-MERN

A simple real-time chat application built with the MERN stack (MongoDB, Express, React, Node) and Socket.IO. This repository contains an Express backend and a Vite + React frontend implementing authentication, friend search/requests, and live messaging.

---

## Features

- User authentication with JWT
- Search users and add friends / friend requests
- Real-time messaging with Socket.IO
- Conversations and messages persisted in MongoDB
- Responsive UI with React + Vite

## Tech Stack

- Backend: Node.js, Express, MongoDB, Mongoose, Socket.IO, JWT
- Frontend: React, Vite, CSS
- Dev tools: npm (or yarn), nodemon (optional)

## Repository Structure

- `backend/` — Express API and server
  - `controllers/` — route handlers
  - `middleware/` — auth/protection middleware
  - `models/` — Mongoose schemas (`convoModel`, `msgModel`, `userModel`)
  - `routes/` — API endpoints (`authRoutes`, `msgRoutes`, `userRoutes`)
  - `server.js` — server entrypoint
  - `util/` — DB connection and JWT helpers
- `frontend/` — React app (Vite)
  - `src/` — components, pages, contexts (Auth, Socket, Chat UI)
  - `public/` — static assets
  - `index.html`, `vite.config.js`


## Environment Variables

Create a `.env` file in the `backend/` folder with values similar to:

```
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
NODE_ENV=development
```

Notes:
- `MONGO_URI`: MongoDB connection string (Atlas or local)
- `JWT_SECRET`: secret used to sign JWT tokens
- `PORT`: backend server port (default 5000)

## Setup & Run (Local)

1. Clone the repo:

```bash
git clone <repo-url>
cd chat-mern
```

2. Backend:

```bash
npm install
# create .env as above
npm run server   # package.json has a server script using nodemon
```

3. Frontend:

```bash
cd ../frontend
npm install
npm run dev
# open the app (Vite usually serves at http://localhost:5173)
```

## API Overview

- Authentication: `/api/auth/*` (register, login)
- Users: `/api/users/*` (search, profile, friends)
- Messages: `/api/messages/*` (send, fetch)
- Real-time: Socket.IO endpoint attached to the Express server for live messaging and presence

Refer to the `backend/routes` and `backend/controllers` folders for concrete endpoints and request/response payloads.

## Usage

- Sign up or log in to create a user session
- Use the search / friends UI to add contacts
- Start or select a conversation to send real-time messages
- Messages are persisted and loaded from the database

## Development Tips

- Use `nodemon` for automatic server reloads during backend development
- Ensure `CLIENT_URL` in the backend `.env` matches the frontend dev server URL
- Open browser devtools to inspect socket/network issues

## Contributing

- Fork the repo, create a feature branch, and open a PR with a clear description
- Include tests or manual validation steps for new features when applicable

## License

Add a `LICENSE` file and choose a license (e.g., MIT) if you want to open-source this repository.

## Contact

If you need help or want to request changes, open an issue in this repository.
