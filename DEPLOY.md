# Deployment Guide

## Frontend (Vercel)

The React + Vite frontend is configured to deploy on Vercel:

```bash
vercel deploy
```

**Environment Variables Needed:**
- `DATABASE_URL`: PostgreSQL connection string (from Supabase)
- `API_PORT`: Port where API server is running (default: 3001)

The frontend proxies `/api/*` requests to the API server.

## API Server

The Express API server can be deployed on:

### Option 1: Railway or Render
```bash
# Build
pnpm --filter @workspace/api-server run build

# Deploy dist/index.mjs
# Environment: DATABASE_URL, PORT=3001
```

### Option 2: Vercel Serverless (Advanced)
Requires converting to serverless functions - out of scope for this guide.

## Database (Supabase)

Already configured and live:
- Project: `db.zytwdgxwyvciwaeukiro.supabase.co`
- Tables: `articles`, `affiliates`
- Connection via `postgresql://postgres:...`

## Local Development

```bash
# Terminal 1: Start API server
export DATABASE_URL='postgresql://...'
export PORT=3001
node artifacts/api-server/dist/index.mjs

# Terminal 2: Start frontend
pnpm --filter @workspace/casino-blog run dev
# Proxy automatically routes /api → http://localhost:3001
```

## Recommended Architecture

```
┌─────────────────┐
│   Vercel CDN    │
│  (Frontend)     │
└────────┬────────┘
         │ /api proxy
         │
┌────────▼────────────────┐
│   Railway/Render API    │
│   (Express + Node)      │
└────────┬────────────────┘
         │
┌────────▼──────────────────┐
│   Supabase PostgreSQL     │
│   (Real-time articles DB) │
└───────────────────────────┘
```
