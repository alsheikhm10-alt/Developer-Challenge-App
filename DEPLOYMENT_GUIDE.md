# DEPLOYMENT & SETUP GUIDE

## 🚀 Local Development Setup

### Prerequisites
- Node.js v16+
- npm or yarn
- MongoDB (local or Atlas)
- Git

### Step 1: Clone the Repository

```bash
cd Developer-Challenge-App
```

### Step 2: Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/codestreak
JWT_SECRET=your_super_secure_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

Start development server:
```bash
npm run dev
```

Backend will be available at: `http://localhost:5000`

### Step 3: Frontend Setup

Open a new terminal:
```bash
cd frontend
npm install
```

Create `.env` file:
```
VITE_API_URL=http://localhost:5000/api
```

Start development server:
```bash
npm run dev
```

Frontend will be available at: `http://localhost:5173`

### Step 4: Verify Installation

1. Open http://localhost:5173 in your browser
2. Register a new account
3. Check MongoDB for created documents
4. Check backend console for logs

---

## 🗄️ Database Setup

### Option 1: Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

3. Use the default connection string in `.env`

### Option 2: MongoDB Atlas (Cloud)

1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/codestreak?retryWrites=true&w=majority
   ```

---

## 🏗️ Project Structure

```
CodeStreak/
├── backend/
│   ├── src/
│   │   ├── models/              # MongoDB schemas
│   │   │   ├── User.ts
│   │   │   ├── Challenge.ts
│   │   │   ├── Submission.ts
│   │   │   ├── Leaderboard.ts
│   │   │   └── index.ts
│   │   ├── routes/              # API routes
│   │   │   ├── authRoutes.ts
│   │   │   ├── challengeRoutes.ts
│   │   │   ├── submissionRoutes.ts
│   │   │   ├── userRoutes.ts
│   │   │   └── leaderboardRoutes.ts
│   │   ├── controllers/         # Business logic
│   │   │   ├── authController.ts
│   │   │   ├── challengeController.ts
│   │   │   ├── submissionController.ts
│   │   │   ├── userController.ts
│   │   │   └── leaderboardController.ts
│   │   ├── middleware/          # Auth & custom middleware
│   │   │   └── auth.ts
│   │   ├── utils/               # Helper functions
│   │   │   └── token.ts
│   │   └── server.ts            # Express app
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── StatBox.tsx
│   │   │   └── ChallengeCard.tsx
│   │   ├── pages/               # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── DailyChallenge.tsx
│   │   │   ├── Leaderboard.tsx
│   │   │   └── Profile.tsx
│   │   ├── services/            # API calls
│   │   │   └── api.ts
│   │   ├── types/               # TypeScript types
│   │   │   └── index.ts
│   │   ├── App.tsx              # Main app component
│   │   ├── main.tsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.cjs
│   └── .env.example
│
├── README.md
├── .gitignore
└── .env.example
```

---

## 📡 API Endpoints Reference

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh JWT token

### Challenges
- `GET /api/challenges/daily` - Get today's challenge
- `GET /api/challenges` - Get all challenges
- `GET /api/challenges/:id` - Get specific challenge
- `POST /api/challenges` - Create challenge (admin only)

### Submissions
- `POST /api/submissions` - Submit challenge
- `GET /api/submissions/user` - Get user's submissions
- `GET /api/submissions/:id` - Get submission details

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/stats` - Get user statistics

### Leaderboard
- `GET /api/leaderboard/points` - Top users by points
- `GET /api/leaderboard/streaks` - Top users by streak
- `GET /api/leaderboard/my-rank` - Get user's rank

### Health Check
- `GET /api/health` - Check API status

---

## 🔐 Authentication Flow

1. User registers with username, email, password
2. Password hashed with bcrypt
3. JWT token generated and sent to frontend
4. Token stored in localStorage
5. Included in Authorization header for protected routes
6. Token expires after 7 days (configurable)

### Protected Routes
All routes except `/api/auth/register` and `/api/auth/login` require valid JWT token.

### Admin Routes
`/api/challenges` (POST) requires admin role.

---

## 📊 Database Models

### User
- username (unique, string)
- email (unique, string)
- password (hashed)
- level (number)
- totalPoints (number)
- currentStreak (number)
- longestStreak (number)
- totalChallengesCompleted (number)
- isAdmin (boolean)
- lastCompletionDate (date)
- timestamps

### Challenge
- title (unique, string)
- description (string)
- difficulty (Easy | Medium | Hard)
- pointsReward (number: 10-100)
- timestamps

### Submission
- userId (ref to User)
- challengeId (ref to Challenge)
- submissionType (text | github | demo)
- submissionValue (string)
- status (pending | approved | rejected)
- pointsEarned (number)
- timestamps

### Leaderboard
- userId (ref to User, unique)
- totalPoints (number)
- currentStreak (number)
- longestStreak (number)
- rank (number)
- Indexes on totalPoints and currentStreak for fast queries

---

## 🎮 Features & Business Logic

### Streaks
- Increments when user completes challenge
- Resets if no challenge completed in a day
- Tracked separately from longest streak
- Displayed on dashboard and leaderboard

### Points System
- Points awarded based on difficulty
- Easy: 10-30 pts
- Medium: 40-60 pts
- Hard: 70-100 pts
- Users get level for every 100 points

### Levels
- Formula: `Math.floor(totalPoints / 100) + 1`
- Progress bar shows points to next level
- Displayed on dashboard and leaderboard

### Daily Challenges
- One challenge per day selected by day-of-year
- Rotates through all challenges
- User can only submit once per day per challenge
- Submission types: code snippet, GitHub link, live demo

### Leaderboard
- Two rankings: by points and by streaks
- Real-time updates
- Top 50 displayed by default
- Shows rank, username, level, points, streak, challenges

---

## 🚀 Deployment

### Backend Deployment (Heroku)

1. Create Heroku account
2. Install Heroku CLI
3. Login: `heroku login`
4. Create app: `heroku create codestreak-api`
5. Set environment variables:
   ```bash
   heroku config:set JWT_SECRET=your_production_secret
   heroku config:set MONGODB_URI=your_atlas_uri
   heroku config:set NODE_ENV=production
   ```
6. Deploy: `git push heroku main`

### Frontend Deployment (Vercel)

1. Create Vercel account
2. Connect GitHub repository
3. Set environment variables:
   ```
   VITE_API_URL=https://your-heroku-app.herokuapp.com/api
   ```
4. Deploy on push

### Frontend Deployment (Netlify)

1. Create Netlify account
2. Connect GitHub repository
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Set environment variables
6. Deploy

### Database (MongoDB Atlas)

1. Create cluster on MongoDB Atlas
2. Add IP whitelist for your deployment
3. Create database user
4. Get connection string
5. Update environment variables

---

## 🧪 Testing the Application

### Create Test Admin User (MongoDB)

```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { isAdmin: true } }
)
```

### Create Test Challenges (API)

```bash
curl -X POST http://localhost:5000/api/challenges \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "title": "Build a Todo App",
    "description": "Create a simple todo application with add, delete, and mark complete functionality using React.",
    "difficulty": "Easy",
    "pointsReward": 50
  }'
```

### Test User Registration

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB service is running
- Check MONGODB_URI in .env
- Verify network access (if using Atlas)

### CORS Errors
- Backend CORS is enabled for all origins
- Check if frontend URL is correct
- Verify API base URL in frontend .env

### Authentication Errors
- Clear localStorage
- Generate new token
- Check JWT_SECRET matches between requests

### Token Expired
- Auto-refresh not implemented yet
- User needs to login again
- Can implement refresh token endpoint

---

## 📝 Future Enhancements

- [ ] Email verification
- [ ] Password reset
- [ ] Challenge categories
- [ ] Achievement badges
- [ ] Weekly challenges
- [ ] Team competitions
- [ ] Discussion forum
- [ ] Challenge submissions with code review
- [ ] Mobile app
- [ ] Real-time notifications
- [ ] Social sharing
- [ ] Dark/Light theme toggle

---

## 📄 License

MIT License - Feel free to use for learning and personal projects!

---

## 🤝 Contributing

Contributions welcome! Fork, create a branch, and submit a pull request.

---

Happy Coding! Build your streak! 🔥
