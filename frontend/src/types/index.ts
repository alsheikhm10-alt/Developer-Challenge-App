export interface User {
  id: string;
  username: string;
  email: string;
  level: number;
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  totalChallengesCompleted: number;
  isAdmin?: boolean;
  createdAt?: string;
}

export interface Challenge {
  _id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  pointsReward: number;
  createdAt: string;
  updatedAt: string;
}

export interface Submission {
  _id: string;
  userId: string;
  challengeId: string;
  submissionType: 'text' | 'github' | 'demo';
  submissionValue: string;
  status: 'pending' | 'approved' | 'rejected';
  pointsEarned: number;
  createdAt: string;
  updatedAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  level: number;
  totalPoints: number;
  currentStreak: number;
  longestStreak?: number;
  totalChallengesCompleted: number;
}

export interface UserStats {
  level: number;
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  totalChallengesCompleted: number;
  pointsToNextLevel: number;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}
