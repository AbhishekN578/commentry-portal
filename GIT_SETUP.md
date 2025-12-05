# Git Setup and Deployment Guide

## Initialize Git Repository

### 1. Initialize Git in the project root

```bash
cd d:\commentry-portal
git init
```

### 2. Add all files to Git

```bash
git add .
```

### 3. Create initial commit

```bash
git commit -m "Initial commit: Social media platform with Django REST Framework and React"
```

## Push to GitHub

### 1. Create a new repository on GitHub
- Go to https://github.com/new
- Repository name: `social-media-platform` (or your preferred name)
- Description: "Full-stack social media platform with Django REST Framework and React"
- Choose Public or Private
- **DO NOT** initialize with README, .gitignore, or license (we already have these)
- Click "Create repository"

### 2. Add GitHub remote

Replace `YOUR_USERNAME` with your GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/social-media-platform.git
```

### 3. Push to GitHub

```bash
git branch -M main
git push -u origin main
```

## Environment Variables Setup

Before deploying, you should secure your sensitive data.

### Backend - Create `.env` file

Create `backend/.env`:

```env
SECRET_KEY=your-secret-key-here-change-in-production
DEBUG=True
DB_NAME=social_platform_db
DB_USER=root
DB_PASSWORD=9113
DB_HOST=localhost
DB_PORT=3306
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### Update settings.py to use environment variables

The settings.py should use `python-decouple` to read from `.env`:

```python
from decouple import config

SECRET_KEY = config('SECRET_KEY', default='django-insecure-default-key')
DEBUG = config('DEBUG', default=True, cast=bool)

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': config('DB_NAME', default='social_platform_db'),
        'USER': config('DB_USER', default='root'),
        'PASSWORD': config('DB_PASSWORD', default='9113'),
        'HOST': config('DB_HOST', default='localhost'),
        'PORT': config('DB_PORT', default='3306'),
    }
}
```

### Add .env to .gitignore

Make sure `.env` is in `.gitignore` (already added):

```
.env
```

## Demo Deployment Options

### Option 1: Local Demo

**Requirements:**
- MySQL installed and running
- Python 3.8+
- Node.js 16+

**Setup:**

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/social-media-platform.git
cd social-media-platform

# 2. Backend setup
cd backend
python -m venv venv
venv\Scripts\activate  # On Windows
# source venv/bin/activate  # On Mac/Linux

pip install -r requirements.txt

# 3. Create MySQL database
mysql -u root -p
CREATE DATABASE social_platform_db;
EXIT;

# 4. Run migrations
python manage.py migrate

# 5. Create superuser
python manage.py createsuperuser

# 6. Start backend
python manage.py runserver

# 7. Frontend setup (new terminal)
cd frontend
npm install
npm start
```

### Option 2: Deploy to Heroku (Backend) + Vercel (Frontend)

#### Backend on Heroku

**1. Install Heroku CLI:**
- Download from https://devcenter.heroku.com/articles/heroku-cli

**2. Create Heroku app:**

```bash
cd backend
heroku login
heroku create your-app-name-backend
```

**3. Add MySQL addon (ClearDB):**

```bash
heroku addons:create cleardb:ignite
```

**4. Get database URL:**

```bash
heroku config:get CLEARDB_DATABASE_URL
```

**5. Create Procfile in backend:**

```
web: gunicorn social_platform.wsgi --log-file -
```

**6. Update requirements.txt:**

Add these lines:
```
gunicorn==21.2.0
dj-database-url==2.1.0
whitenoise==6.6.0
```

**7. Deploy:**

```bash
git add .
git commit -m "Heroku deployment setup"
git push heroku main
heroku run python manage.py migrate
heroku run python manage.py createsuperuser
```

#### Frontend on Vercel

**1. Install Vercel CLI:**

```bash
npm install -g vercel
```

**2. Deploy:**

```bash
cd frontend
vercel
```

**3. Update API URL:**

In `frontend/src/api.js`, change:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
```

**4. Set environment variable in Vercel:**
- Go to Vercel dashboard
- Project Settings → Environment Variables
- Add: `REACT_APP_API_URL` = `https://your-app-name-backend.herokuapp.com/api`

### Option 3: Deploy to Railway (Full Stack)

**1. Create account at https://railway.app**

**2. Create new project:**
- Click "New Project"
- Select "Deploy from GitHub repo"
- Connect your repository

**3. Add MySQL database:**
- Click "New" → "Database" → "MySQL"

**4. Configure backend:**
- Add environment variables from Railway MySQL
- Deploy backend service

**5. Configure frontend:**
- Add frontend service
- Set `REACT_APP_API_URL` environment variable

## Demo README for GitHub

Add this to your README.md:

```markdown
# Social Media Platform

A modern full-stack social media platform built with Django REST Framework and React.

## 🚀 Live Demo

- **Frontend**: [Your Vercel URL]
- **Backend API**: [Your Heroku/Railway URL]
- **Admin Panel**: [Backend URL]/admin

## 📸 Screenshots

[Add screenshots here]

## ✨ Features

- User registration and JWT authentication
- Create, read, update, delete posts
- Like posts with live count updates
- Comment on posts with author names
- User profile management
- Admin dashboard with user statistics
- Responsive design with dark theme

## 🛠️ Tech Stack

**Backend:**
- Django 4.2.7
- Django REST Framework
- JWT Authentication
- MySQL Database

**Frontend:**
- React 18
- React Router v6
- Axios
- Modern CSS with Glassmorphism

## 📦 Installation

See [INSTALLATION.md](./INSTALLATION.md) for detailed setup instructions.

## 📝 API Documentation

See [API.md](./API.md) for API endpoints documentation.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License
```

## Quick Commands Reference

```bash
# Initialize and push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main

# Update after changes
git add .
git commit -m "Your commit message"
git push

# Create a new branch for features
git checkout -b feature/new-feature
git push -u origin feature/new-feature

# Pull latest changes
git pull origin main
```

## Important Notes

1. **Never commit sensitive data**: Make sure `.env` files are in `.gitignore`
2. **Update CORS settings**: Add your production domain to `CORS_ALLOWED_ORIGINS`
3. **Change SECRET_KEY**: Generate a new secret key for production
4. **Set DEBUG=False**: In production, always set `DEBUG=False`
5. **Use HTTPS**: Always use HTTPS in production for security

## Demo Credentials

For demo purposes, you can create a demo admin account:
- Username: `demo_admin`
- Password: `Demo@123456`

And a demo user:
- Username: `demo_user`
- Password: `Demo@123456`

**Remember to change these in production!**
