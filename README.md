# Hungry Hut

Hungry Hut is a restaurant ecosystem prototype built with a React + Vite frontend and an Express + TypeScript backend.

## Features

- Premium customer-facing homepage
- Dynamic menu and product discovery
- Cart, quantity controls and checkout flow
- Restaurant admin dashboard overview
- Order creation API with payment stub and settings data
- Mood-based food recommendations and promotional sections

## Local development

```bash
npm install
npm run dev
```

This starts:

- Frontend: http://localhost:5173
- Backend: http://localhost:4000

## Production build

```bash
npm run build
```

## Project structure

- `client/` — React front-end
- `server/` — Express API and data model
- `package.json` — root scripts for running both services together
