# Social Media Platform

A full-stack social media platform built with Django REST Framework and React.

## Features

### User Features
- **User Registration & Login** with JWT authentication
- **User Profile** management with bio and avatar
- **Create Posts** with title, content, and optional images
- **Like Posts** with live count updates
- **Comment on Posts** with author names displayed
- **Delete Own Posts**

### Admin Features
- **Admin Dashboard** with live user statistics
- **View All Users** with online/offline status
- **Delete Any Post** (admin privilege)
- **Live User Count** (total and online users)

### Design
- Modern dark theme with glassmorphism effects
- Responsive layout for all screen sizes
- Smooth animations and transitions
- Gradient accents and vibrant colors

## Tech Stack

**Backend:**
- Django 4.2.7
- Django REST Framework
- JWT Authentication (Simple JWT)
- MySQL Database
- CORS Headers

**Frontend:**
- React 18
- React Router v6
- Axios
- React Icons

## Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- MySQL Server

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment (recommended):
```bash
python -m venv venv
venv\Scripts\activate  # On Windows
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create MySQL database:
```bash
mysql -u root -p9113
CREATE DATABASE social_platform_db;
EXIT;
```

5. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

6. Create superuser (admin):
```bash
python manage.py createsuperuser
```

7. Start development server:
```bash
python manage.py runserver
```

Backend will run at: http://localhost:8000

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

Frontend will run at: http://localhost:3000

## Usage

1. **Register**: Create a new account at `/register`
2. **Login**: Sign in at `/login`
3. **Create Posts**: Use the sidebar form to create posts
4. **Interact**: Like and comment on posts in the feed
5. **Profile**: View and edit your profile at `/profile`
6. **Admin**: Access admin dashboard at `/admin` (admin users only)

## API Endpoints

### Authentication
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - Login and get JWT tokens
- `POST /api/auth/logout/` - Logout
- `GET /api/auth/profile/` - Get user profile
- `PATCH /api/auth/profile/` - Update user profile
- `GET /api/auth/users/` - Get all users (admin only)

### Posts
- `GET /api/posts/` - List all posts
- `POST /api/posts/` - Create new post
- `GET /api/posts/{id}/` - Get post details
- `PUT /api/posts/{id}/` - Update post (owner/admin)
- `DELETE /api/posts/{id}/` - Delete post (owner/admin)

### Likes & Comments
- `POST /api/posts/{id}/like/` - Toggle like on post
- `GET /api/posts/{id}/comments/` - Get post comments
- `POST /api/comments/` - Create comment

## Project Structure

```
commentry-portal/
├── backend/
│   ├── social_platform/      # Django project settings
│   ├── users/                 # User app (authentication)
│   ├── posts/                 # Posts app (posts, comments, likes)
│   ├── manage.py
│   └── requirements.txt
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/        # React components
    │   ├── context/           # Auth context
    │   ├── styles/            # CSS files
    │   ├── api.js             # Axios configuration
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## Permissions

- **Posts**: Anyone can view, authenticated users can create
- **Delete Post**: Only post owner or admin can delete
- **Comments**: Authenticated users can comment
- **Likes**: Authenticated users can like/unlike
- **Admin Dashboard**: Only admin users can access

## Development Notes

- The backend uses MySQL with credentials: root/9113
- JWT tokens expire after 1 day
- CORS is configured for localhost:3000
- Media files (avatars, post images) are stored in backend/media/

## License

MIT License
