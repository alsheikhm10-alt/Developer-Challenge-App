# QUICK START GUIDE

## ⚡ 5-Minute Setup

### Prerequisites
- Node.js 16+ installed
- MongoDB running locally OR MongoDB Atlas account

### Terminal 1: Backend

```bash
cd backend
npm install
```

Create `backend/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/codestreak
JWT_SECRET=dev_secret_key_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

Start backend:
```bash
npm run dev
```

✅ Backend ready: http://localhost:5000

### Terminal 2: Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env`:
```
VITE_API_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm run dev
```

✅ Frontend ready: http://localhost:5173

---

## 🎮 First Time Usage

1. Open http://localhost:5173
2. Click "Register"
3. Create account (username, email, password)
4. Login
5. See Dashboard
6. Click "Start Today's Challenge"
7. Submit a solution
8. Check Leaderboard
9. Visit Profile

---

## 📝 Create Sample Challenges

### Using MongoDB CLI

```bash
# Open MongoDB shell
mongosh

# Switch to codestreak database
use codestreak

# Insert sample challenges
db.challenges.insertMany([
  {
    title: "Build a Todo App",
    description: "Create a React component that allows users to add, delete, and mark todo items as complete. Use useState hook for state management.",
    difficulty: "Easy",
    pointsReward: 50,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Weather App with API",
    description: "Build a weather application that fetches data from a public weather API (OpenWeather, WeatherAPI, etc). Display current weather and forecast.",
    difficulty: "Medium",
    pointsReward: 60,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Responsive Portfolio",
    description: "Create a fully responsive personal portfolio website using CSS Grid/Flexbox. Should work on desktop, tablet, and mobile devices.",
    difficulty: "Medium",
    pointsReward: 70,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "E-commerce Shopping Cart",
    description: "Build a shopping cart feature with add/remove items, quantity adjustment, and total price calculation. Use React Context or Redux for state.",
    difficulty: "Hard",
    pointsReward: 100,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Real-time Chat Application",
    description: "Create a chat application with WebSocket support. Users should be able to send/receive messages in real-time.",
    difficulty: "Hard",
    pointsReward: 100,
    createdAt: new Date(),
    updatedAt: new Date()
  }
])

# Verify
db.challenges.find()
```

---

## 👨‍💻 Make User Admin

```bash
# Open MongoDB shell
mongosh
use codestreak

# Replace 'your_email@example.com' with actual email
db.users.updateOne(
  { email: "your_email@example.com" },
  { $set: { isAdmin: true } }
)

# Verify
db.users.findOne({ email: "your_email@example.com" })
```

Then you can create challenges via API or UI.

---

## 🔍 Check Your Data

```bash
# Open MongoDB shell
mongosh
use codestreak

# View all users
db.users.find().pretty()

# View all challenges
db.challenges.find().pretty()

# View all submissions
db.submissions.find().pretty()

# View user stats
db.users.findOne({ username: "your_username" })
```

---

## 🆘 Common Issues

### "Cannot find module" error
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### Port 5173 or 5000 already in use
```bash
# Change port in backend/.env or frontend/vite.config.ts
```

### MongoDB connection failed
```bash
# Check if MongoDB is running
# macOS: brew services list
# Windows: Services app or 'net start MongoDB'
# Or use MongoDB Atlas (cloud)
```

### CORS error
- Ensure backend is running
- Check VITE_API_URL in frontend/.env
- Clear browser cache

---

## 📚 Next Steps

1. ✅ Setup complete
2. 📖 Read [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for production
3. 🧪 Test all features
4. 🎨 Customize styling
5. 🚀 Deploy to production

---

## 🎯 Key Files to Know

**Backend:**
- `backend/src/server.ts` - Main Express app
- `backend/src/models/` - Database schemas
- `backend/src/routes/` - API endpoints
- `backend/src/controllers/` - Business logic
- `backend/.env` - Configuration

**Frontend:**
- `frontend/src/App.tsx` - Main React component
- `frontend/src/pages/` - Page components
- `frontend/src/services/api.ts` - API calls
- `frontend/.env` - Configuration

---

Enjoy building with CodeStreak! 🔥
