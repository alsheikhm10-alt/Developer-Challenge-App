import { Response } from 'express';
import { User } from '../models/User';
import { AuthRequest } from '../middleware/auth';

export const getLeaderboard = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { limit = 50, sortBy = 'points' } = req.query;

    let sortOption: any = { points: -1 };
    if (sortBy === 'streak') {
      sortOption = { currentStreak: -1, points: -1 };
    }

    const users = await User.find()
      .select('name email points level currentStreak longestStreak')
      .sort(sortOption)
      .limit(parseInt(limit as string));

    // Add rank
    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      id: user._id,
      name: user.name,
      email: user.email,
      points: user.points,
      level: user.level,
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak,
    }));

    res.json({ leaderboard });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
      totalPoints: user.totalPoints,
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak,
      totalChallengesCompleted: user.totalChallengesCompleted,
    }));

    res.json({ leaderboard });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leaderboard', error });
  }
};

export const getUserRank = async (
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

    // Get user's rank by points
    const rankByPoints = await User.countDocuments({
      totalPoints: { $gt: user.totalPoints },
    });

    // Get user's rank by streak
    const rankByStreak = await User.countDocuments({
      currentStreak: { $gt: user.currentStreak },
    });

    res.json({
      userStats: {
        username: user.username,
        level: calculateLevel(user.totalPoints),
        totalPoints: user.totalPoints,
        currentStreak: user.currentStreak,
        rankByPoints: rankByPoints + 1,
        rankByStreak: rankByStreak + 1,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch rank', error });
  }
};
