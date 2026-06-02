import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import StatBox from '../components/StatBox';
import { userService } from '../services/api';
import { User, UserStats } from '../types';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<User | null>(null);
  const [stats, setStats] = React.useState<UserStats | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileResponse = await userService.getUserProfile();
        setUser(profileResponse.user);

        const statsResponse = await userService.getUserStats();
        setStats(statsResponse.stats);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-400">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {user?.username}! 🎮
          </h1>
          <p className="text-gray-400">
            Keep your streak alive and climb the leaderboard
          </p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatBox
            icon="⭐"
            label="Level"
            value={stats?.level || 0}
            color="purple"
          />
          <StatBox
            icon="💰"
            label="Total Points"
            value={stats?.totalPoints || 0}
            color="orange"
          />
          <StatBox
            icon="🔥"
            label="Current Streak"
            value={stats?.currentStreak || 0}
            color="orange"
          />
          <StatBox
            icon="🏆"
            label="Longest Streak"
            value={stats?.longestStreak || 0}
            color="green"
          />
        </div>

        {/* Daily Challenge Call to Action */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-blue-900 to-blue-800 border-blue-500">
              <h2 className="text-2xl font-bold text-white mb-4">
                Today's Challenge Awaits! 🎯
              </h2>
              <p className="text-blue-100 mb-6">
                Complete today's daily challenge to build your streak and earn
                points. Don't miss a day!
              </p>
              <Button
                variant="success"
                onClick={() => navigate('/challenge')}
              >
                Start Today's Challenge
              </Button>
            </Card>
          </div>

          <Card>
            <h3 className="text-lg font-bold text-white mb-4">Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-400">To Next Level</span>
                  <span className="text-sm font-bold text-blue-400">
                    {stats?.pointsToNextLevel || 0} pts
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded transition-all"
                    style={{
                      width: `${
                        ((stats?.totalPoints || 0) %
                          ((stats?.level || 1) * 100)) *
                        100
                      ) / ((stats?.level || 1) * 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="text-xs text-gray-500 text-center">
                Challenges Completed: {stats?.totalChallengesCompleted || 0}
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/leaderboard">
            <Card className="hover:shadow-lg hover:shadow-blue-500/30 cursor-pointer h-full">
              <h3 className="text-lg font-bold text-white mb-2">🏅 Leaderboard</h3>
              <p className="text-gray-400 text-sm">
                Check your rank and compete with other developers
              </p>
            </Card>
          </Link>
          <Link to="/profile">
            <Card className="hover:shadow-lg hover:shadow-blue-500/30 cursor-pointer h-full">
              <h3 className="text-lg font-bold text-white mb-2">👤 Profile</h3>
              <p className="text-gray-400 text-sm">
                View your complete stats and achievements
              </p>
            </Card>
          </Link>
          <Link to="/challenge">
            <Card className="hover:shadow-lg hover:shadow-blue-500/30 cursor-pointer h-full">
              <h3 className="text-lg font-bold text-white mb-2">💪 All Challenges</h3>
              <p className="text-gray-400 text-sm">
                Browse and solve all available challenges
              </p>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
