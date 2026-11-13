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

This prototype can be deployed with the frontend on Vercel and the API on Render:

1. In Render, create a Blueprint from this repository. It uses [`render.yaml`](./render.yaml) to build and start the API.
2. In Vercel, import this repository and set the project root directory to `client`. Use `npm run build` as the build command and `dist` as the output directory.
3. Set the Vercel environment variable `VITE_API_URL` to `https://<your-render-service>.onrender.com/api`, then deploy.

The API currently keeps orders in memory and uses a payment sandbox stub; orders are not persisted and payments are not processed. This deployment is suitable for a demo, not live transactions.

## Project structure

- `client/` — React front-end
- `server/` — Express API and data model
- `package.json` — root scripts for running both services together
