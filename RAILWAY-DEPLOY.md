# Railway API Server Deployment

## Quick Start

### 1. Create Railway Account
- Go to https://railway.app
- Sign in with GitHub (recommended)
- Create new project

### 2. Deploy from GitHub

#### Option A: Railway Dashboard (Easiest)

1. **Create New Project** → **Deploy from GitHub repo**
2. Select **Tachfine37/Casinoking**
3. Railway auto-detects and builds
4. Add Environment Variables:
   ```
   DATABASE_URL=postgresql://postgres:Azertyqsd123@db.zytwdgxwyvciwaeukiro.supabase.co:5432/postgres
   PORT=3001
   NODE_ENV=production
   ```
5. Click **Deploy** ✅

#### Option B: Railway CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to project
cd /Users/mac/Desktop/Gamble-Blog
railway link

# Configure build
railway variables set DATABASE_URL="postgresql://..."
railway variables set PORT=3001
railway variables set NODE_ENV=production

# Deploy
railway up
```

### 3. Get Your API URL

After deployment:
1. Go to Railway Dashboard
2. Click your project
3. Copy the **Public Domain** URL (e.g., `https://casinoking-api-prod.up.railway.app`)

### 4. Update Frontend

Update `vercel.json` with your API URL:

```json
{
  "env": {
    "API_URL": "https://casinoking-api-prod.up.railway.app",
    "PORT": "3000",
    "BASE_PATH": "/"
  }
}
```

Or set it as a Vercel environment variable in the dashboard.

## Build Configuration

Railway uses `Procfile` or `railway.json`:

**Procfile:**
```
web: node --enable-source-maps ./artifacts/api-server/dist/index.mjs
```

**Build:** Nixpacks automatically detects pnpm and builds using `pnpm install && pnpm build`

## Environment Variables Needed

```
DATABASE_URL=postgresql://postgres:Azertyqsd123@db.zytwdgxwyvciwaeukiro.supabase.co:5432/postgres
PORT=3001
NODE_ENV=production
```

## Troubleshooting

### "Cannot find module 'pg'"
The build might be missing dependencies. Ensure `pnpm install` runs:
- Check `.npmrc` exists with `shamefully-hoist=true`
- Rebuild: `railway up --force`

### API returning 502 Bad Gateway
- Check logs: `railway logs`
- Verify DATABASE_URL is correct
- Check port is 3001 in Railway, but Vercel should use the public domain

### Logs
```bash
railway logs -f  # Follow logs in real-time
railway logs --tail 50  # Last 50 lines
```

## Verifying Deployment

Once deployed, test the API:

```bash
curl https://your-api-domain.railway.app/api/healthz
# Should return: {"status":"ok"}

curl https://your-api-domain.railway.app/api/affiliates
# Should return: {"affiliates":[...]}
```

## Next Steps

1. ✅ Deploy API to Railway
2. ✅ Get public API URL
3. ✅ Update Vercel with API_URL env var
4. ✅ Redeploy frontend on Vercel
5. ✅ Test end-to-end

## Cost

Railway free tier:
- **$5/month free credits**
- Includes: 1 PostgreSQL DB + 1 deployment
- Each deployment uses ~0.5-1 credit/month (depending on traffic)

**Vercel free tier:**
- Unlimited deployments
- **No paid databases** (we use Supabase separately)

Total cost: ~$0 with free tiers + Supabase (free tier available)
