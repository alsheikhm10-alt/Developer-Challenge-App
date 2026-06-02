import axios from 'axios';
import {
  User,
  Challenge,
  Submission,
  LeaderboardEntry,
  AuthResponse,
  UserStats,
} from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Auth interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth Service
export const authService = {
  register: async (
    username: string,
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', {
      username,
      email,
      password,
    });
    return response.data;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  refreshToken: async (): Promise<{ token: string }> => {
    const response = await api.post('/auth/refresh');
    return response.data;
  },
};

// Challenge Service
export const challengeService = {
  getDailyChallenge: async (): Promise<{ challenge: Challenge }> => {
    const response = await api.get('/challenges/daily');
    return response.data;
  },

  getAllChallenges: async (): Promise<{ challenges: Challenge[] }> => {
    const response = await api.get('/challenges');
    return response.data;
  },

  getChallengeById: async (id: string): Promise<{ challenge: Challenge }> => {
    const response = await api.get(`/challenges/${id}`);
    return response.data;
  },

  createChallenge: async (
    title: string,
    description: string,
    difficulty: 'Easy' | 'Medium' | 'Hard',
    pointsReward: number
  ): Promise<{ challenge: Challenge }> => {
    const response = await api.post('/challenges', {
      title,
      description,
      difficulty,
      pointsReward,
    });
    return response.data;
  },
};

// Submission Service
export const submissionService = {
  submitChallenge: async (
    challengeId: string,
    submissionType: 'text' | 'github' | 'demo',
    submissionValue: string
  ): Promise<{ submission: Submission; userStats: any }> => {
    const response = await api.post('/submissions', {
      challengeId,
      submissionType,
      submissionValue,
    });
    return response.data;
  },

  getUserSubmissions: async (): Promise<{ submissions: Submission[] }> => {
    const response = await api.get('/submissions/user');
    return response.data;
  },

  getSubmissionById: async (id: string): Promise<{ submission: Submission }> => {
    const response = await api.get(`/submissions/${id}`);
    return response.data;
  },
};

// User Service
export const userService = {
  getUserProfile: async (): Promise<{ user: User }> => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  updateUserProfile: async (username: string): Promise<{ user: User }> => {
    const response = await api.put('/users/profile', { username });
    return response.data;
  },

  getUserStats: async (): Promise<{ stats: UserStats }> => {
    const response = await api.get('/users/stats');
    return response.data;
  },
};

// Leaderboard Service
export const leaderboardService = {
  getLeaderboardByPoints: async (
    limit: number = 50
  ): Promise<{ leaderboard: LeaderboardEntry[] }> => {
    const response = await api.get('/leaderboard/points', { params: { limit } });
    return response.data;
  },

  getLeaderboardByStreaks: async (
    limit: number = 50
  ): Promise<{ leaderboard: LeaderboardEntry[] }> => {
    const response = await api.get('/leaderboard/streaks', { params: { limit } });
    return response.data;
  },

  getUserRank: async (): Promise<{ userStats: any }> => {
    const response = await api.get('/leaderboard/my-rank');
    return response.data;
  },
};

export default api;
