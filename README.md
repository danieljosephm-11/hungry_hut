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

## Deployment

The Render web service serves the frontend and API from the same public URL:

1. In Render, create or update the service using [`render.yaml`](./render.yaml).
2. The frontend is built with `VITE_API_URL=/api`, so it calls the API on the same host. Render supplies `PORT` automatically.

The API currently keeps orders in memory and uses a payment sandbox stub; orders are not persisted and payments are not processed. This deployment is suitable for a demo, not live transactions.

## Project structure

- `client/` — React front-end
- `server/` — Express API and data model
- `package.json` — root scripts for running both services together
