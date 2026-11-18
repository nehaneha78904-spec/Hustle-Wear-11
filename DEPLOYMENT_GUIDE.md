# Hustle Wear — Full Stack Deployment Guide

## 🗂️ Project Structure
```
New folder/
├── hustle-wear-frontend/     # React Vite app → Cloudflare Pages
├── hustle-wear-backend/      # Node.js Express API → Render
├── .gitignore
└── DEPLOYMENT_GUIDE.md
```

## 🛠️ Prerequisites
- Node.js v18+ installed
- Git installed
- MongoDB Atlas account (free tier)
- Cloudflare account (free)
- Render account (free)

---

## 📦 Step 1: MongoDB Atlas Setup

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free M0 cluster
3. Create a database user (username + strong password)
4. Add IP address: `0.0.0.0/0` (allow from anywhere — required for Render)
5. Click "Connect" → "Connect your application" → Copy the connection string
6. Replace `<username>` and `<password>` in the string
7. Add database name: `hustlewear` before the `?` → e.g. `mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/hustlewear?retryWrites=true&w=majority`

---

## 🔧 Step 2: Backend Setup (Local)

```bash
cd hustle-wear-backend
npm install
```

Create `.env` (copy from `.env.example` and fill in values):
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/hustlewear?retryWrites=true&w=majority
JWT_SECRET=change_this_to_a_long_random_string_min_32_chars
JWT_REFRESH_SECRET=another_long_random_string_min_32_chars
JWT_EXPIRES_IN=7d
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

Seed the database with sample products:
```bash
npm run seed
```

Start the development server:
```bash
npm run dev
```

The backend will be running at `http://localhost:5000`

Test with: `curl http://localhost:5000/api/health`

---

## ⚛️ Step 3: Frontend Setup (Local)

```bash
cd hustle-wear-frontend
npm install
```

Create `.env`:
```
VITE_API_URL=http://localhost:5000
```

Start the development server:
```bash
npm run dev
```

The frontend will be at `http://localhost:5173`

---

## 🚀 Step 4: Deploy Backend to Render

### 4.1 Push to GitHub
```bash
# In the root of the project (New folder)
git init
git add .
git commit -m "Initial commit: Hustle Wear full stack app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/hustle-wear.git
git push -u origin main
```

### 4.2 Create Render Web Service
1. Go to [render.com](https://render.com) → Sign up / Log in
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `hustle-wear-backend`
   - **Region**: Singapore (closest to India)
   - **Branch**: `main`
   - **Root Directory**: `hustle-wear-backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### 4.3 Add Environment Variables in Render
In the Render dashboard → Environment tab, add:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `MONGODB_URI` | `mongodb+srv://...` (your Atlas URI) |
| `JWT_SECRET` | `your_very_long_random_secret_key` |
| `JWT_REFRESH_SECRET` | `your_another_long_random_secret` |
| `JWT_EXPIRES_IN` | `7d` |
| `CORS_ORIGIN` | `https://YOUR-APP.pages.dev` (fill after Cloudflare deploy) |

> ⚠️ **Important**: After getting your Cloudflare URL, come back and update `CORS_ORIGIN`!

5. Click **"Create Web Service"**
6. Wait 2-3 minutes for first deploy
7. Your backend URL will be: `https://hustle-wear-backend.onrender.com`

> 📝 **Note**: Free tier Render services spin down after 15 minutes of inactivity. First request after sleep takes ~30 seconds. Upgrade to Starter ($7/month) for always-on.

---

## ☁️ Step 5: Deploy Frontend to Cloudflare Pages

### 5.1 Build the Frontend
First, update the production `.env` or use Cloudflare's environment variables:
```
VITE_API_URL=https://hustle-wear-backend.onrender.com
```

### 5.2 Create Cloudflare Pages Project
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Left sidebar → **"Workers & Pages"** → **"Pages"**
3. Click **"Connect to Git"**
4. Authorize GitHub → Select your repository
5. Configure the build:
   - **Project name**: `hustle-wear`
   - **Production branch**: `main`
   - **Root directory**: `hustle-wear-frontend`
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`

### 5.3 Add Environment Variables in Cloudflare
In the Cloudflare Pages dashboard → Settings → Environment Variables:

| Variable | Value (Production) |
|----------|-------------------|
| `VITE_API_URL` | `https://hustle-wear-backend.onrender.com` |

6. Click **"Save and Deploy"**
7. Your frontend URL will be: `https://hustle-wear.pages.dev`

---

## 🔗 Step 6: Connect Frontend ↔ Backend

After both are deployed:

1. **Update Render CORS_ORIGIN**:
   - Render Dashboard → hustle-wear-backend → Environment
   - Change `CORS_ORIGIN` to `https://hustle-wear.pages.dev`
   - Save → Service will auto-redeploy

2. **Update Cloudflare VITE_API_URL** (if not already done):
   - Cloudflare Pages → hustle-wear → Settings → Environment Variables
   - Set `VITE_API_URL` to `https://hustle-wear-backend.onrender.com`
   - Trigger a new deployment

---

## 🌱 Step 7: Seed Production Database

After backend is deployed to Render, run seed locally pointing to production MongoDB:
```bash
cd hustle-wear-backend
# Temporarily set MONGODB_URI to production in .env
npm run seed
# Then change MONGODB_URI back to local if needed
```

---

## 🔍 Step 8: Verify Everything Works

Checklist:
- [ ] `https://hustle-wear-backend.onrender.com/api/health` returns `{"status":"OK"}`
- [ ] `https://hustle-wear-backend.onrender.com/api/products` returns product list
- [ ] `https://hustle-wear.pages.dev` loads the homepage
- [ ] Products display on homepage
- [ ] Add to cart works
- [ ] Checkout flow works (address → delivery → payment → confirmation)
- [ ] Product detail page loads at `/product/:id`
- [ ] Shop catalog with filters works

---

## 🛡️ Security Checklist Before Go-Live

- [ ] Change all `.env` secrets to strong random values (use `openssl rand -hex 32`)
- [ ] Never commit `.env` files to git (`.gitignore` is configured)
- [ ] Set `NODE_ENV=production` on Render
- [ ] Restrict MongoDB Atlas IP if possible (Render IPs are dynamic, so `0.0.0.0/0` is needed for free tier)
- [ ] Enable Cloudflare WAF (Web Application Firewall) for DDoS protection
- [ ] Set up Cloudflare Analytics for traffic monitoring

---

## 🗄️ Database Management

### Local Development MongoDB
You can use MongoDB Compass (GUI) or Atlas Data Explorer.

### Useful MongoDB Queries
```javascript
// Check all products
db.products.find({}).count()

// Find trending products  
db.products.find({ isTrending: true })

// Update product stock
db.products.updateOne({ slug: "overdyed-script-heavy-boxy-tee" }, { $set: { "sizes.$[el].stock": 50 } }, { arrayFilters: [{ "el.size": "L" }] })
```

---

## 🔄 CI/CD (Auto-Deploy on Git Push)

Both Render and Cloudflare Pages auto-deploy when you push to `main`:
```bash
git add .
git commit -m "feat: your change description"
git push origin main
# Render and Cloudflare both auto-detect and redeploy
```

---

## 📞 Support & Troubleshooting

### Backend not starting on Render?
- Check Render logs: Dashboard → Service → Logs tab
- Common issues: Wrong `MONGODB_URI`, missing env vars

### Frontend showing blank page?
- Check browser console (F12) for CORS errors
- Verify `VITE_API_URL` points to deployed backend
- Check Cloudflare build logs

### Products not loading?
- Check if backend is awake (free tier spins down): visit `/api/health` first
- Run `npm run seed` to populate the database

### CORS Error?
- Verify `CORS_ORIGIN` in Render matches your Cloudflare URL exactly (no trailing slash)
- Format: `https://hustle-wear.pages.dev` ✅ NOT `https://hustle-wear.pages.dev/` ❌

---

## 📊 Estimated Costs

| Service | Plan | Cost |
|---------|------|------|
| MongoDB Atlas | M0 Free | **Free** (512MB) |
| Render | Free | **Free** (spins down) |
| Cloudflare Pages | Free | **Free** (unlimited bandwidth) |
| **Total** | | **\$0/month** |

For production with no cold starts:
| Service | Plan | Cost |
|---------|------|------|
| Render | Starter | \$7/month |
| Total | | **\$7/month** |

---

*Last updated: November 2025 | Hustle Wear Archive System v1.0*
