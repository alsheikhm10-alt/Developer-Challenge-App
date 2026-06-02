# CodeStreak Setup Checklist

Complete this checklist to get CodeStreak running on your machine.

---

## ✅ Prerequisites (Do First!)

- [ ] Node.js v16+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Git installed (`git --version`)
- [ ] MongoDB installed locally OR MongoDB Atlas account created
- [ ] Text editor (VS Code recommended)
- [ ] Terminal/Command Prompt ready

---

## ✅ Phase 1: Backend Setup

### 1. Navigate to Backend
```bash
cd Developer-Challenge-App/backend
```

### 2. Install Dependencies
```bash
npm install
```
- [ ] All dependencies installed successfully
- [ ] node_modules folder created

### 3. Configure Environment
Create `.env` file in `backend/` folder:
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/codestreak
JWT_SECRET=dev_secret_key_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

- [ ] `.env` file created with correct values
- [ ] JWT_SECRET looks secure

### 4. Setup MongoDB
**Option A - Local MongoDB:**
- [ ] MongoDB installed and running
- [ ] Can connect with connection string

**Option B - MongoDB Atlas:**
- [ ] Account created at mongodb.com/cloud/atlas
- [ ] Cluster created
- [ ] Database user created
- [ ] Connection string obtained
- [ ] IP address whitelisted
- [ ] Connection string in `.env`

### 5. Start Backend
```bash
npm run dev
```
- [ ] Server starts without errors
- [ ] Console shows "Connected to MongoDB"
- [ ] Console shows "Server running on http://localhost:5000"
- [ ] GET http://localhost:5000/api/health returns success

---

## ✅ Phase 2: Frontend Setup

### 1. Open New Terminal
Keep backend running, open another terminal window.

### 2. Navigate to Frontend
```bash
cd Developer-Challenge-App/frontend
```

### 3. Install Dependencies
```bash
npm install
```
- [ ] All dependencies installed successfully
- [ ] node_modules folder created

### 4. Configure Environment
Create `.env` file in `frontend/` folder:
```bash
VITE_API_URL=http://localhost:5000/api
```

- [ ] `.env` file created

### 5. Start Frontend
```bash
npm run dev
```
- [ ] Vite dev server starts
- [ ] Console shows "http://localhost:5173"
- [ ] Browser opens automatically (or navigate to it)
- [ ] Landing page displays with CodeStreak logo

---

## ✅ Phase 3: Test the Application

### 1. Register Account
- [ ] Click "Register" button
- [ ] Fill in username, email, password
- [ ] Click "Register"
- [ ] Redirected to Dashboard
- [ ] User data appears correct

### 2. Check Dashboard
- [ ] See "Welcome back, [username]!" message
- [ ] Statistics boxes show (Level 1, 0 Points, 0 Streak, etc.)
- [ ] "Start Today's Challenge" button visible
- [ ] Profile and Leaderboard links accessible

### 3. View Daily Challenge
- [ ] Click "Start Today's Challenge"
- [ ] Challenge title and description displayed
- [ ] Submit button and submission form visible
- [ ] Submit a sample solution

### 4. Verify Submission
- [ ] Success message appears
- [ ] Redirected to Dashboard
- [ ] Points increased
- [ ] Challenge completed count incremented

### 5. Check Leaderboard
- [ ] Click "Leaderboard" in navbar
- [ ] Your username appears in the list
- [ ] Your points displayed correctly
- [ ] Can toggle between "Top by Points" and "Top by Streaks"

### 6. View Profile
- [ ] Click "Profile" in navbar
- [ ] All user stats displayed correctly
- [ ] Progress bar to next level shown
- [ ] Can edit username
- [ ] Achievements section visible

### 7. Logout & Login
- [ ] Click "Logout" button
- [ ] Redirected to home page
- [ ] Click "Login"
- [ ] Login with your credentials
- [ ] Redirected to Dashboard
- [ ] Same user data shown

---

## ✅ Phase 4: Database Verification

### 1. Check MongoDB
Open MongoDB shell or compass:

```bash
mongosh
use codestreak
db.users.find().pretty()
```

- [ ] Your user document exists
- [ ] Email and username match
- [ ] totalPoints updated
- [ ] currentStreak is 1 (submitted once)

### 2. Verify Collections
```bash
show collections
```

- [ ] users collection exists
- [ ] challenges collection exists
- [ ] submissions collection exists
- [ ] leaderboard collection exists

### 3. Check Challenge
```bash
db.challenges.findOne()
```

- [ ] At least one challenge exists (or create one)
- [ ] Has title, description, difficulty, pointsReward

### 4. Check Submission
```bash
db.submissions.findOne()
```

- [ ] Your submission recorded
- [ ] Links to your user and challenge
- [ ] Status shows "approved"
- [ ] pointsEarned matches challenge reward

---

## ✅ Phase 5: Create Test Data (Optional)

### 1. Create More Challenges
In MongoDB shell:
```bash
db.challenges.insertMany([
  {
    title: "Build a Weather App",
    description: "Create app that fetches weather data from API",
    difficulty: "Medium",
    pointsReward: 65,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "E-commerce Cart",
    description: "Build shopping cart with checkout feature",
    difficulty: "Hard",
    pointsReward: 100,
    createdAt: new Date(),
    updatedAt: new Date()
  }
])
```

- [ ] Multiple challenges created
- [ ] Can see different challenges on daily rotation

### 2. Make User Admin
```bash
db.users.updateOne(
  { email: "your_email@example.com" },
  { $set: { isAdmin: true } }
)
```

- [ ] User isAdmin field set to true

### 3. Create Challenge via API
In frontend, login as admin, then:
- [ ] Navigate to create challenge page (after implementing)
- [ ] Fill in challenge details
- [ ] Submit and verify in database

---

## ✅ Phase 6: Advanced Testing

### 1. Test Authentication
- [ ] Try accessing /dashboard without login → Redirects to /login
- [ ] Try with invalid credentials → Error message shown
- [ ] Token stored in localStorage (check DevTools)
- [ ] Token included in API requests (check Network tab)

### 2. Test Multiple Users
- [ ] Register 2-3 different users
- [ ] Complete challenges with each user
- [ ] View leaderboard with multiple users
- [ ] Verify rankings are correct

### 3. Test Streaks
- [ ] Submit today's challenge (Streak = 1)
- [ ] Check tomorrow's challenge
- [ ] Submit again (Streak = 2)
- [ ] Try to submit same challenge twice → Error shown
- [ ] Check longestStreak doesn't change

### 4. Test Points & Levels
- [ ] Complete multiple challenges
- [ ] Total points increase
- [ ] Level increases when points reach 100, 200, etc.
- [ ] Progress bar updates correctly

### 5. Test Different Submission Types
- [ ] Submit code snippet
- [ ] Submit GitHub link
- [ ] Submit live demo link
- [ ] Verify all types accepted and stored

---

## ✅ Phase 7: Troubleshooting

### Backend Won't Start
- [ ] Check Port 5000 not in use
- [ ] Check MongoDB running
- [ ] Check .env file exists
- [ ] Check MONGODB_URI correct
- [ ] Delete node_modules, run `npm install` again

### Frontend Won't Start
- [ ] Check Port 5173 not in use
- [ ] Check .env file with VITE_API_URL
- [ ] Check backend running
- [ ] Delete node_modules, run `npm install` again

### Can't Connect to MongoDB
- [ ] If local: `mongosh` to test connection
- [ ] If Atlas: Check IP whitelisted, credentials correct
- [ ] Check connection string in .env

### API Errors
- [ ] Check backend console for errors
- [ ] Use DevTools Network tab to see responses
- [ ] Check API_DOCUMENTATION.md for endpoint specs

### Authentication Issues
- [ ] Clear localStorage
- [ ] Clear browser cache
- [ ] Re-login
- [ ] Check JWT_SECRET matches between parts

---

## ✅ Phase 8: Production Preparation

- [ ] Read DEPLOYMENT_GUIDE.md
- [ ] Update JWT_SECRET to strong value
- [ ] Test with production build: `npm run build` (frontend)
- [ ] Test error handling with bad data
- [ ] Add rate limiting (if deploying)
- [ ] Setup error logging
- [ ] Configure CORS for production domain
- [ ] Test on multiple browsers
- [ ] Test on mobile device

---

## ✅ Final Verification

### All Systems Go? Check These:

- [ ] Backend running without errors
- [ ] Frontend displays correctly
- [ ] Can register new account
- [ ] Can login successfully
- [ ] Dashboard shows stats correctly
- [ ] Can view and submit challenges
- [ ] Points update correctly
- [ ] Streak tracking works
- [ ] Leaderboard displays users
- [ ] Profile page shows all info
- [ ] Can logout and login again
- [ ] Database has user data
- [ ] All API endpoints responding
- [ ] No console errors in browser
- [ ] No console errors in backend

---

## 📝 Notes

- **Keep Both Terminals Running:** Backend in Terminal 1, Frontend in Terminal 2
- **Auto-reload:** Both have auto-reload on file changes
- **Reset Data:** Delete MongoDB collections to start fresh
- **New Challenges:** Add via MongoDB or (future) admin interface

---

## 🎉 Ready to Deploy?

Once everything works locally:
1. Read DEPLOYMENT_GUIDE.md completely
2. Choose deployment platform
3. Set production environment variables
4. Deploy backend first
5. Deploy frontend with backend URL
6. Test thoroughly on production

---

## 📞 Getting Help

- **Backend Issue?** Check backend console logs
- **Frontend Issue?** Check browser DevTools (Console & Network tabs)
- **Database Issue?** Check MongoDB documentation or Atlas UI
- **API Issue?** Check API_DOCUMENTATION.md for endpoint specs
- **General Issue?** Check QUICK_START.md or DEPLOYMENT_GUIDE.md

---

## ✅ Completion

Date Completed: _______________

All items checked? **Congratulations! CodeStreak is ready!** 🎉🔥

Next Step: Customize and Deploy! 🚀
