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

## Production notes

- API authentication can be enabled with `AUTH_REQUIRED=true` and `API_BEARER_TOKEN=...`
- Request payloads should be validated before reaching controllers
- Keep feature-specific modules under frontend/src/features for better scaling
