# CodeStreak Backend

A production-ready Node.js/Express/TypeScript backend for CodeStreak, a developer challenge application with JWT authentication, role-based access control, streaks, points, and leaderboards.

## Features

- **Authentication & Authorization**
  - JWT-based authentication with Bearer tokens
  - Role-based access control (user, admin)
  - Secure password hashing with bcryptjs

- **Challenge Management**
  - Create, read, update, and delete challenges (admin only)
  - Daily challenge retrieval
  - Filter by difficulty and category
  - Points and estimated time tracking

- **Submission & Scoring**
  - Submit solutions with text answers, GitHub links, or demo links
  - Admin approval/rejection workflow
  - Automatic points and streak updates on approval
  - Duplicate submission prevention (one per day)

- **Gamification**
  - Points system (10-500 per challenge)
  - Automatic level calculation
  - Current and longest streaks tracking
  - Global leaderboard rankings

- **Data Validation**
  - Express-validator for input validation
  - MongoDB schema validation
  - Custom business logic validation

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript 5.1+
- **Framework**: Express.js 4.18+
- **Database**: MongoDB 7.0+ with Mongoose 7.0+ ODM
- **Authentication**: JWT (jsonwebtoken 9.1+)
- **Password Hashing**: bcryptjs 2.4.3
- **Input Validation**: express-validator 7.0+
- **Development**: ts-node-dev 2.0.0 (auto-reload)

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts           # MongoDB connection
│   ├── controllers/
│   │   ├── authController.ts     # Auth endpoints
│   │   ├── challengeController.ts # Challenge CRUD
│   │   ├── submissionController.ts # Submission workflow
│   │   └── leaderboardController.ts # Rankings
│   ├── middleware/
│   │   ├── auth.ts               # JWT auth & role-based access
│   │   ├── errorHandler.ts       # Centralized error handling
│   │   └── validation.ts         # Input validation rules
│   ├── models/
│   │   ├── User.ts               # User schema & methods
│   │   ├── Challenge.ts          # Challenge schema
│   │   └── Submission.ts         # Submission schema
│   ├── routes/
│   │   ├── authRoutes.ts         # Auth endpoints
│   │   ├── challengeRoutes.ts    # Challenge endpoints
│   │   ├── submissionRoutes.ts   # Submission endpoints
│   │   └── leaderboardRoutes.ts  # Leaderboard endpoints
│   ├── utils/
│   │   └── helpers.ts            # Utility functions
│   └── index.ts                  # Server entry point
├── .env                          # Environment variables
├── .env.example                  # Example env file
├── package.json                  # Dependencies
└── tsconfig.json                 # TypeScript config
```

## Setup Instructions

### Prerequisites
- Node.js 16+ 
- MongoDB 7.0+ (local or Atlas)
- npm or yarn

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/codestreak

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:5173
```

For MongoDB Atlas:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/codestreak?retryWrites=true&w=majority
```

### 3. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:5000` and auto-reload on file changes.

### 4. Build for Production

```bash
npm run build
npm start
```

## API Endpoints

### Authentication (`/api/auth`)

**POST /register**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```
Response: `201` with JWT token and user object

**POST /login**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```
Response: `200` with JWT token and user object

**GET /me**
- Headers: `Authorization: Bearer <token>`
- Response: `200` with authenticated user's profile

---

### Challenges (`/api/challenges`)

**GET /today**
- Returns today's featured challenge
- Headers: `Authorization: Bearer <token>`

**GET /**
- Query params: `difficulty`, `category`, `sort` (points/date)
- Headers: `Authorization: Bearer <token>`

**GET /:id**
- Headers: `Authorization: Bearer <token>`

**POST /**
- Admin only
- Body: `{ title, description, difficulty, category, points, estimatedTime, date }`
- Headers: `Authorization: Bearer <admin_token>`

**PUT /:id**
- Admin only
- Headers: `Authorization: Bearer <admin_token>`

**DELETE /:id**
- Admin only
- Headers: `Authorization: Bearer <admin_token>`

---

### Submissions (`/api/submissions`)

**POST /**
```json
{
  "challengeId": "ObjectId",
  "textAnswer": "My answer...",
  "githubLink": "https://github.com/user/repo",
  "liveDemoLink": "https://demo.example.com"
}
```
Note: At least one submission method required

**GET /me**
- Returns authenticated user's submissions
- Headers: `Authorization: Bearer <token>`

**GET /**
- Admin only
- Query params: `status` (pending/approved/rejected)
- Headers: `Authorization: Bearer <admin_token>`

**PATCH /:id/approve**
- Admin only
- Auto-updates user points and streaks
- Headers: `Authorization: Bearer <admin_token>`

**PATCH /:id/reject**
- Admin only
- Headers: `Authorization: Bearer <admin_token>`

---

### Leaderboard (`/api/leaderboard`)

**GET /**
- Query params: `limit` (default: 50), `sortBy` (points/streak)
- Headers: `Authorization: Bearer <token>`
- Response: Array of top users with rank

---

### Health Check

**GET /api/health**
- No authentication required
- Response: `{ "status": "OK" }`

## Authentication

All endpoints except `/api/auth/register`, `/api/auth/login`, and `/api/health` require JWT authentication.

Include token in request headers:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Token expires in 7 days.

## Business Logic

### Streak Management
- Streaks only continue if user submits the previous day
- Any gap resets streak to 1
- Longest streak is tracked separately
- Updated when submission is approved

### Points System
- Each challenge awards 10-500 points
- Points added to user when submission approved
- Level = floor(points / 100) + 1
- Leaderboard sortable by points or streak

### Duplicate Prevention
- Users cannot submit same challenge twice in one day
- Uses `getTodayDate()` for 24-hour window calculation

## Database Schemas

### User
```typescript
{
  name: string;
  email: string (unique);
  password: string (hashed);
  role: 'user' | 'admin';
  points: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
```

### Challenge
```typescript
{
  title: string (unique);
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string (8 categories);
  points: number (10-500);
  estimatedTime: number (minutes, min: 5);
  date: Date;
  createdBy: ObjectId (User reference);
  createdAt: Date;
  updatedAt: Date;
}
```

### Submission
```typescript
{
  userId: ObjectId (User reference);
  challengeId: ObjectId (Challenge reference);
  textAnswer?: string;
  githubLink?: string;
  liveDemoLink?: string;
  status: 'pending' | 'approved' | 'rejected';
  pointsAwarded: number;
  submittedAt: Date;
  updatedAt: Date;
}
```

## Error Handling

All errors return JSON with status code and message:

```json
{
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required"
    }
  ]
}
```

Common status codes:
- `200`: Success
- `201`: Created
- `400`: Bad request (validation error)
- `401`: Unauthorized (missing/invalid token)
- `403`: Forbidden (insufficient permissions)
- `404`: Not found
- `409`: Conflict (e.g., duplicate submission)
- `500`: Server error

## Development Notes

- Password hashing uses 10 salt rounds (bcryptjs)
- JWT tokens signed with JWT_SECRET environment variable
- Validation uses express-validator 7.0+ with custom rules
- All timestamps use MongoDB `createdAt` and `updatedAt` fields
- Database connections are established on server startup
- Error middleware catches and formats all errors consistently

## Security

- ✅ Passwords hashed before storage
- ✅ JWT tokens for stateless authentication
- ✅ Role-based access control (RBAC)
- ✅ Input validation on all endpoints
- ✅ CORS configured for frontend origin
- ✅ Sensitive fields excluded from responses (passwords)

## Testing

To test endpoints locally:

```bash
# Health check
curl http://localhost:5000/api/health

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"test123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"test123"}'

# Get profile
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <token>"
```

Use Postman, Insomnia, or VS Code REST Client for more complex testing.

## Production Deployment

1. Change `JWT_SECRET` to a secure random string
2. Set `NODE_ENV=production`
3. Use MongoDB Atlas for managed database
4. Set up proper error logging/monitoring
5. Configure `CORS_ORIGIN` for frontend domain
6. Use environment variables for all sensitive config
7. Enable HTTPS/TLS on production server

## License

MIT

## Support

For issues or questions, please check the API documentation or create an issue in the repository.
