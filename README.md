# Online E-Learning Platform

A full-stack e-learning management app built with Express and React/Vite.

## Project structure

- Root: project config, environment files, and startup files
- backend/: server entry points, routes, controllers, models, middleware, and config
- frontend/: Vite + React client application

## Tech stack

- Backend: Node.js, Express, MongoDB, Mongoose
- Frontend: React, Vite, React Router DOM

## Getting started

1. Install dependencies:
   - `npm install`
   - `cd frontend && npm install`
2. Copy the environment example:
   - `copy .env.example .env` (Windows)
3. Start MongoDB locally. If you use Docker, run:
   - `docker run -d --name mongodb -p 27017:27017 mongo:7`
4. Start the backend:
   - `npm run dev`
5. Start the frontend:
   - `npm run client`

## Environment variables

Use the values from [.env.example](.env.example) to configure the app.

## Production deployment

### 1) Backend on Render
1. Push the project to GitHub.
2. Create a new Web Service on Render.
3. Connect the repository and use the included `render.yaml` blueprint.
4. The service uses:
   - Build command: `npm ci && npm run build:client`
   - Start command: `npm start`
5. Add environment variables:
   - `NODE_ENV=production`
   - `MONGO_URI=your_mongodb_atlas_connection_string`
   - `AUTH_REQUIRED=false`

### 2) Frontend on Vercel
1. Create a new Vercel project.
2. Import the repository.
3. Set the root directory to `frontend`.
4. The frontend already includes `frontend/vercel.json` for SPA route rewrites.
5. Set the environment variable:
   - `VITE_API_URL=https://your-render-app-url.onrender.com/api`

### 3) MongoDB Atlas
1. Create a free MongoDB Atlas cluster.
2. Create a database user.
3. Allow access from `0.0.0.0/0.0.0.0` for development, or restrict it later.
4. Copy the connection string into `MONGO_URI`.

### 4) Optional production hardening
- API authentication can be enabled with `AUTH_REQUIRED=true` and `API_BEARER_TOKEN=...`
- Request payloads should be validated before reaching controllers
- Keep feature-specific modules under frontend/src/features for better scaling
