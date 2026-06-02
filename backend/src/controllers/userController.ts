import { Response } from 'express';
import { User } from '../models/User';
import { AuthRequest } from '../middleware/auth';
import { calculateLevel } from '../utils/token';

export const getUserProfile = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        level: calculateLevel(user.totalPoints),
        totalPoints: user.totalPoints,
        currentStreak: user.currentStreak,
        longestStreak: user.longestStreak,
        totalChallengesCompleted: user.totalChallengesCompleted,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch profile', error });
  }
};

export const updateUserProfile = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId;
    const { username } = req.body;

    if (!username) {
      res.status(400).json({ message: 'Username is required' });
      return;
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { username },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        level: calculateLevel(user.totalPoints),
        totalPoints: user.totalPoints,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile', error });
  }
};

export const getUserStats = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const level = calculateLevel(user.totalPoints);

    res.json({
      stats: {
        level,
        totalPoints: user.totalPoints,
        currentStreak: user.currentStreak,
        longestStreak: user.longestStreak,
        totalChallengesCompleted: user.totalChallengesCompleted,
        pointsToNextLevel: (level + 1) * 100 - user.totalPoints,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch stats', error });
  }
};
