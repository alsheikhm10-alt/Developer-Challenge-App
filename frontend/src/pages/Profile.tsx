import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import StatBox from '../components/StatBox';
import { userService } from '../services/api';
import { User, UserStats } from '../types';

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await userService.getUserProfile();
        setUser(userResponse.user);
        setUsername(userResponse.user.username);

        const statsResponse = await userService.getUserStats();
        setStats(statsResponse.stats);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const response = await userService.updateUserProfile(username);
      setUser(response.user);
      setEditing(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-400">Loading profile...</div>
      </div>
    );
  }

  if (!user || !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Profile 👤</h1>
          <p className="text-gray-400">View and manage your profile</p>
        </div>

        {error && (
          <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Profile Header */}
        <Card className="border-blue-500 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {editing ? (
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full max-w-xs"
                  />
                ) : (
                  user.username
                )}
              </h2>
              <p className="text-gray-400">{user.email}</p>
              <p className="text-sm text-gray-500 mt-2">
                Joined{' '}
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : 'recently'}
              </p>
            </div>
            <div className="text-6xl">🎮</div>
          </div>

          {!editing ? (
            <Button onClick={() => setEditing(true)}>Edit Profile</Button>
          ) : (
            <div className="flex gap-3">
              <Button variant="success" onClick={handleUpdateProfile}>
                Save Changes
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setEditing(false);
                  setUsername(user.username);
                }}
              >
                Cancel
              </Button>
            </div>
          )}
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatBox
            icon="⭐"
            label="Level"
            value={stats.level}
            color="purple"
          />
          <StatBox
            icon="💰"
            label="Total Points"
            value={stats.totalPoints}
            color="orange"
          />
          <StatBox
            icon="🔥"
            label="Current Streak"
            value={stats.currentStreak}
            color="orange"
          />
          <StatBox
            icon="🏆"
            label="Longest Streak"
            value={stats.longestStreak}
            color="green"
          />
        </div>

        {/* Progress Section */}
        <Card className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">Progress</h3>
          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-3">
                <span className="text-gray-300 font-medium">
                  Level {stats.level} → Level {stats.level + 1}
                </span>
                <span className="text-blue-400 font-bold">
                  {100 - stats.pointsToNextLevel} / 100 pts
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded h-4">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 h-4 rounded transition-all"
                  style={{
                    width: `${((100 - stats.pointsToNextLevel) / 100) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
              <div>
                <p className="text-gray-400 text-sm">Challenges Completed</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {stats.totalChallengesCompleted}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Average Points per Challenge</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {stats.totalChallengesCompleted > 0
                    ? Math.round(
                        stats.totalPoints / stats.totalChallengesCompleted
                      )
                    : 0}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Achievements Section */}
        <Card>
          <h3 className="text-2xl font-bold text-white mb-6">Achievements 🏅</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-700 p-4 rounded">
              <p className="text-gray-300 font-medium">First Challenge</p>
              <p className="text-xl font-bold text-green-400 mt-2">
                {stats.totalChallengesCompleted >= 1 ? '✅' : '🔒'}
              </p>
            </div>
            <div className="bg-gray-700 p-4 rounded">
              <p className="text-gray-300 font-medium">Week Warrior</p>
              <p className="text-xl font-bold text-green-400 mt-2">
                {stats.currentStreak >= 7 ? '✅' : '🔒'}
              </p>
            </div>
            <div className="bg-gray-700 p-4 rounded">
              <p className="text-gray-300 font-medium">Points Master</p>
              <p className="text-xl font-bold text-green-400 mt-2">
                {stats.totalPoints >= 1000 ? '✅' : '🔒'}
              </p>
            </div>
            <div className="bg-gray-700 p-4 rounded">
              <p className="text-gray-300 font-medium">Persistence</p>
              <p className="text-xl font-bold text-green-400 mt-2">
                {stats.longestStreak >= 14 ? '✅' : '🔒'}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
