# Deployment Guide

This guide provides step-by-step instructions for deploying the Social Media Platform to production.

## Overview

- **Backend**: Railway (with PostgreSQL database)
- **Frontend**: Vercel (optimized for React)
- **Database**: PostgreSQL on Railway

## Prerequisites

- GitHub account
- Railway account (sign up at [railway.app](https://railway.app))
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Git repository pushed to GitHub

## Backend Deployment (Railway)

### 1. Create Railway Project

1. Go to [railway.app](https://railway.app) and sign in
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your repository: `commentry-portal`
5. Select the **backend** directory as the root

### 2. Add PostgreSQL Database

1. In your Railway project, click **"New"** → **"Database"** → **"PostgreSQL"**
2. Railway will automatically create a PostgreSQL database
3. The `DATABASE_URL` will be automatically added to your environment variables

### 3. Configure Environment Variables

In Railway project settings, add these environment variables:

```
SECRET_KEY=your-super-secret-key-here-change-this
DEBUG=False
ALLOWED_HOSTS=your-app-name.railway.app
FRONTEND_URL=https://your-frontend-url.vercel.app
DATABASE_URL=(automatically set by Railway)
```

**Generate a secure SECRET_KEY**:
```python
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### 4. Deploy

1. Railway will automatically detect the `Procfile` and deploy
2. The deployment will:
   - Install dependencies from `requirements.txt`
   - Run database migrations
   - Collect static files
   - Start the Gunicorn server

### 5. Create Superuser (Admin)

1. In Railway dashboard, go to your backend service
2. Click on **"Settings"** → **"Deploy"** → **"Run Command"**
3. Run: `python manage.py createsuperuser`
4. Follow the prompts to create an admin user

### 6. Get Backend URL

- Your backend will be available at: `https://your-app-name.railway.app`
- Test the API: `https://your-app-name.railway.app/api/posts/`

---

## Frontend Deployment (Vercel)

### 1. Create Vercel Project

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository: `commentry-portal`
4. Configure project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### 2. Configure Environment Variables

In Vercel project settings → Environment Variables, add:

```
REACT_APP_API_URL=https://your-backend-url.railway.app/api
```

Replace `your-backend-url` with your actual Railway backend URL.

### 3. Deploy

1. Click **"Deploy"**
2. Vercel will:
   - Install dependencies
   - Build the React app
   - Deploy to their CDN

### 4. Get Frontend URL

- Your frontend will be available at: `https://your-project-name.vercel.app`

---

## Post-Deployment Configuration

### Update Backend CORS Settings

After deploying the frontend, update the Railway environment variables:

```
FRONTEND_URL=https://your-project-name.vercel.app
```

This ensures the backend accepts requests from your frontend.

### Update Frontend API URL

If you change the backend URL, update the Vercel environment variable:

```
REACT_APP_API_URL=https://your-new-backend-url.railway.app/api
```

Then redeploy the frontend.

---

## Testing the Deployment

### 1. Test Backend API

Visit these endpoints:
- `https://your-backend-url.railway.app/api/posts/` - Should return posts list
- `https://your-backend-url.railway.app/admin/` - Django admin panel

### 2. Test Frontend

1. Visit `https://your-project-name.vercel.app`
2. Register a new user
3. Login with credentials
4. Create a post
5. Like and comment on posts
6. Test profile page

### 3. Test Admin Features

1. Login with superuser credentials
2. Visit `/admin` route in the frontend
3. Verify user statistics display
4. Test post deletion

---

## Troubleshooting

### Backend Issues

**Database Connection Error**:
- Verify `DATABASE_URL` is set in Railway environment variables
- Check PostgreSQL service is running

**Static Files Not Loading**:
- Run `python manage.py collectstatic` in Railway console
- Verify WhiteNoise is in `MIDDLEWARE` settings

**CORS Errors**:
- Verify `FRONTEND_URL` matches your Vercel deployment URL
- Check `CORS_ALLOWED_ORIGINS` in settings

### Frontend Issues

**API Connection Error**:
- Verify `REACT_APP_API_URL` is set correctly in Vercel
- Check backend URL is accessible
- Verify CORS is configured on backend

**Routing Issues (404 on refresh)**:
- Verify `vercel.json` is present in frontend directory
- Check SPA routing is configured

**Environment Variables Not Working**:
- Environment variables must start with `REACT_APP_`
- Redeploy after changing environment variables

---

## Continuous Deployment

Both Railway and Vercel support automatic deployments:

- **Railway**: Automatically deploys when you push to the main branch
- **Vercel**: Automatically deploys when you push to the main branch

To disable auto-deployment, check the settings in each platform.

---

## Local Development with Production Settings

### Backend

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` with your local settings (MySQL for development).

### Frontend

Create a `.env` file in the frontend directory:

```bash
cp .env.example .env
```

Edit `.env`:
```
REACT_APP_API_URL=http://localhost:8000/api
```

---

## Security Checklist

- [ ] `DEBUG=False` in production
- [ ] Strong `SECRET_KEY` generated and set
- [ ] `ALLOWED_HOSTS` configured correctly
- [ ] Database credentials secured (use Railway's DATABASE_URL)
- [ ] CORS settings restrictive (only allow your frontend URL)
- [ ] HTTPS enabled (automatic on Railway and Vercel)
- [ ] Environment variables not committed to Git

---

## Monitoring and Logs

### Railway

- View logs: Railway Dashboard → Your Service → Logs
- Monitor metrics: Railway Dashboard → Your Service → Metrics

### Vercel

- View logs: Vercel Dashboard → Your Project → Deployments → View Function Logs
- Monitor analytics: Vercel Dashboard → Your Project → Analytics

---

## Updating the Deployment

### Backend Updates

1. Make changes to backend code
2. Commit and push to GitHub
3. Railway automatically redeploys
4. Run migrations if needed: `python manage.py migrate`

### Frontend Updates

1. Make changes to frontend code
2. Commit and push to GitHub
3. Vercel automatically redeploys

---

## Cost Considerations

### Railway
- **Free Tier**: $5 credit per month (enough for small projects)
- **Paid Plans**: Start at $5/month for more resources

### Vercel
- **Free Tier**: Unlimited personal projects
- **Paid Plans**: Start at $20/month for teams

Both platforms offer generous free tiers suitable for demos and small projects.
