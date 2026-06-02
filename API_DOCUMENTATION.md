# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All endpoints except `/auth/register` and `/auth/login` require a JWT token in the Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## Auth Endpoints

### Register User
**POST** `/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com",
    "level": 1,
    "totalPoints": 0
  }
}
```

---

### Login User
**POST** `/auth/login`

Authenticate and get a JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com",
    "level": 5,
    "totalPoints": 450,
    "currentStreak": 3,
    "isAdmin": false
  }
}
```

---

### Refresh Token
**POST** `/auth/refresh`

Get a new JWT token.

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (200):**
```json
{
  "message": "Token refreshed",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## Challenge Endpoints

### Get Daily Challenge
**GET** `/challenges/daily`

Get today's daily challenge.

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (200):**
```json
{
  "challenge": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Build a Todo App",
    "description": "Create a React component that allows users to add, delete, and mark todo items as complete.",
    "difficulty": "Easy",
    "pointsReward": 50,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### Get All Challenges
**GET** `/challenges`

Get list of all available challenges.

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Query Parameters:**
- None

**Response (200):**
```json
{
  "challenges": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Build a Todo App",
      "description": "...",
      "difficulty": "Easy",
      "pointsReward": 50,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    },
    // ... more challenges
  ]
}
```

---

### Get Challenge by ID
**GET** `/challenges/:id`

Get a specific challenge by ID.

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**URL Parameters:**
- `id` (string): Challenge ID

**Response (200):**
```json
{
  "challenge": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Build a Todo App",
    "description": "...",
    "difficulty": "Easy",
    "pointsReward": 50,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### Create Challenge (Admin Only)
**POST** `/challenges`

Create a new challenge. Requires admin role.

**Headers:**
```
Authorization: Bearer YOUR_ADMIN_JWT_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Build a Weather App",
  "description": "Create an app that fetches weather data from an API...",
  "difficulty": "Medium",
  "pointsReward": 65
}
```

**Response (201):**
```json
{
  "message": "Challenge created successfully",
  "challenge": {
    "_id": "507f1f77bcf86cd799439013",
    "title": "Build a Weather App",
    "description": "...",
    "difficulty": "Medium",
    "pointsReward": 65,
    "createdAt": "2024-01-16T14:20:00Z",
    "updatedAt": "2024-01-16T14:20:00Z"
  }
}
```

---

## Submission Endpoints

### Submit Challenge
**POST** `/submissions`

Submit a solution for a challenge.

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "challengeId": "507f1f77bcf86cd799439012",
  "submissionType": "github",
  "submissionValue": "https://github.com/username/todo-app"
}
```

**Submission Types:**
- `text` - Code snippet
- `github` - GitHub repository link
- `demo` - Live demo link

**Response (201):**
```json
{
  "message": "Challenge submitted successfully! 🎉",
  "submission": {
    "_id": "507f1f77bcf86cd799439014",
    "userId": "507f1f77bcf86cd799439011",
    "challengeId": "507f1f77bcf86cd799439012",
    "submissionType": "github",
    "submissionValue": "https://github.com/username/todo-app",
    "status": "approved",
    "pointsEarned": 50,
    "createdAt": "2024-01-20T08:15:00Z",
    "updatedAt": "2024-01-20T08:15:00Z"
  },
  "userStats": {
    "totalPoints": 450,
    "currentStreak": 3,
    "level": 5
  }
}
```

---

### Get User Submissions
**GET** `/submissions/user`

Get all submissions for the logged-in user.

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (200):**
```json
{
  "submissions": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "userId": "507f1f77bcf86cd799439011",
      "challengeId": {
        "_id": "507f1f77bcf86cd799439012",
        "title": "Build a Todo App",
        "difficulty": "Easy",
        "pointsReward": 50
      },
      "submissionType": "github",
      "submissionValue": "https://github.com/username/todo-app",
      "status": "approved",
      "pointsEarned": 50,
      "createdAt": "2024-01-20T08:15:00Z",
      "updatedAt": "2024-01-20T08:15:00Z"
    }
  ]
}
```

---

### Get Submission by ID
**GET** `/submissions/:id`

Get details of a specific submission.

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**URL Parameters:**
- `id` (string): Submission ID

**Response (200):**
```json
{
  "submission": {
    "_id": "507f1f77bcf86cd799439014",
    "userId": {
      "_id": "507f1f77bcf86cd799439011",
      "username": "johndoe"
    },
    "challengeId": {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Build a Todo App"
    },
    "submissionType": "github",
    "submissionValue": "https://github.com/username/todo-app",
    "status": "approved",
    "pointsEarned": 50,
    "createdAt": "2024-01-20T08:15:00Z",
    "updatedAt": "2024-01-20T08:15:00Z"
  }
}
```

---

## User Endpoints

### Get User Profile
**GET** `/users/profile`

Get the logged-in user's profile information.

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (200):**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com",
    "level": 5,
    "totalPoints": 450,
    "currentStreak": 3,
    "longestStreak": 7,
    "totalChallengesCompleted": 9,
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

---

### Update User Profile
**PUT** `/users/profile`

Update user profile information.

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "newusername"
}
```

**Response (200):**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "newusername",
    "email": "john@example.com",
    "level": 5,
    "totalPoints": 450
  }
}
```

---

### Get User Stats
**GET** `/users/stats`

Get detailed statistics for the logged-in user.

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (200):**
```json
{
  "stats": {
    "level": 5,
    "totalPoints": 450,
    "currentStreak": 3,
    "longestStreak": 7,
    "totalChallengesCompleted": 9,
    "pointsToNextLevel": 50
  }
}
```

---

## Leaderboard Endpoints

### Get Leaderboard by Points
**GET** `/leaderboard/points`

Get top users ranked by total points.

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Query Parameters:**
- `limit` (number, optional, default: 50, max: 100) - Number of users to return

**Response (200):**
```json
{
  "leaderboard": [
    {
      "rank": 1,
      "userId": "507f1f77bcf86cd799439001",
      "username": "topplayer",
      "level": 12,
      "totalPoints": 1250,
      "currentStreak": 15,
      "totalChallengesCompleted": 25
    },
    {
      "rank": 2,
      "userId": "507f1f77bcf86cd799439002",
      "username": "secondplace",
      "level": 11,
      "totalPoints": 1100,
      "currentStreak": 8,
      "totalChallengesCompleted": 22
    }
    // ... more users
  ]
}
```

---

### Get Leaderboard by Streaks
**GET** `/leaderboard/streaks`

Get top users ranked by current streak.

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Query Parameters:**
- `limit` (number, optional, default: 50, max: 100) - Number of users to return

**Response (200):**
```json
{
  "leaderboard": [
    {
      "rank": 1,
      "userId": "507f1f77bcf86cd799439001",
      "username": "streakking",
      "level": 9,
      "totalPoints": 850,
      "currentStreak": 30,
      "longestStreak": 45,
      "totalChallengesCompleted": 30
    },
    // ... more users
  ]
}
```

---

### Get User Rank
**GET** `/leaderboard/my-rank`

Get the logged-in user's rank on both leaderboards.

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (200):**
```json
{
  "userStats": {
    "username": "johndoe",
    "level": 5,
    "totalPoints": 450,
    "currentStreak": 3,
    "rankByPoints": 45,
    "rankByStreak": 128
  }
}
```

---

## Health Check

### Check API Status
**GET** `/health`

Check if the API is running.

**Response (200):**
```json
{
  "status": "API is running",
  "timestamp": "2024-01-20T12:30:45.123Z"
}
```

---

## Error Responses

### Validation Error (400)
```json
{
  "message": "All fields are required"
}
```

### Authentication Error (401)
```json
{
  "message": "Access token required"
}
```

### Authorization Error (403)
```json
{
  "message": "Admin access required"
}
```

### Not Found (404)
```json
{
  "message": "User not found"
}
```

### Conflict (409)
```json
{
  "message": "You have already submitted for this challenge today"
}
```

### Server Error (500)
```json
{
  "message": "Internal server error",
  "error": "Error details (only in development)"
}
```

---

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Daily Challenge
```bash
curl -X GET http://localhost:5000/api/challenges/daily \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Submit Challenge
```bash
curl -X POST http://localhost:5000/api/submissions \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "challengeId": "507f1f77bcf86cd799439012",
    "submissionType": "github",
    "submissionValue": "https://github.com/username/repo"
  }'
```

### Get Leaderboard
```bash
curl -X GET "http://localhost:5000/api/leaderboard/points?limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Rate Limiting
Currently, there is no rate limiting implemented. It's recommended to add it for production deployment.

---

## CORS
The API has CORS enabled for all origins during development. For production, restrict to specific domains.

---

## Support
For issues or questions, please check the DEPLOYMENT_GUIDE.md or QUICK_START.md files.
