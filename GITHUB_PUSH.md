# Quick Git Setup - Push to GitHub

## ✅ Already Done
- ✅ Git repository initialized
- ✅ All files added
- ✅ Initial commit created

## 🚀 Next Steps to Push to GitHub

### 1. Create GitHub Repository

Go to: https://github.com/new

- **Repository name**: `social-media-platform` (or your choice)
- **Description**: "Full-stack social media platform with Django and React"
- **Visibility**: Public or Private (your choice)
- **DO NOT** check "Initialize with README" (we already have files)
- Click **"Create repository"**

### 2. Connect and Push

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add GitHub as remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Example:**
```bash
git remote add origin https://github.com/johndoe/social-media-platform.git
git branch -M main
git push -u origin main
```

### 3. Enter GitHub Credentials

When prompted:
- Enter your GitHub username
- Enter your GitHub password or Personal Access Token

**Note:** If using 2FA, you'll need a Personal Access Token instead of password:
- Go to: https://github.com/settings/tokens
- Click "Generate new token (classic)"
- Select scopes: `repo`
- Copy the token and use it as your password

## 📝 Future Updates

After making changes to your code:

```bash
# Stage all changes
git add .

# Commit with a message
git commit -m "Description of your changes"

# Push to GitHub
git push
```

## 🌐 Deploy as Demo

See [GIT_SETUP.md](./GIT_SETUP.md) for detailed deployment options:
- Local demo setup
- Deploy to Heroku + Vercel
- Deploy to Railway

## 📋 Current Status

Your repository is ready with:
- ✅ Complete Django backend
- ✅ Complete React frontend
- ✅ MySQL database configuration
- ✅ README.md with instructions
- ✅ .gitignore files
- ✅ All source code committed

**Total files committed:** 50+ files including all backend and frontend code

## 🔗 Useful Links

- **GitHub**: https://github.com
- **Heroku**: https://heroku.com
- **Vercel**: https://vercel.com
- **Railway**: https://railway.app

## ⚠️ Important Security Notes

Before pushing to public repository:

1. **Remove sensitive data** from code (already done via .gitignore)
2. **Change SECRET_KEY** in production
3. **Update database credentials** for production
4. **Set DEBUG=False** in production

The `.gitignore` files are already configured to exclude:
- `.env` files
- `__pycache__/`
- `node_modules/`
- Database files
- Virtual environments

## 🎯 Quick Command Reference

```bash
# Check status
git status

# View commit history
git log --oneline

# Create new branch
git checkout -b feature-name

# Switch branches
git checkout main

# Pull latest changes
git pull origin main

# View remotes
git remote -v
```

---

**You're all set!** Just create the GitHub repository and run the push commands above.
