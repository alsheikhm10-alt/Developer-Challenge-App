import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import StatBox from '../components/StatBox';
import { leaderboardService } from '../services/api';
import { LeaderboardEntry } from '../types';

const Leaderboard: React.FC = () => {
  const [leaderboardType, setLeaderboardType] = useState<'points' | 'streaks'>(
    'points'
  );
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userRank, setUserRank] = useState<any>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        let response;
        if (leaderboardType === 'points') {
          response = await leaderboardService.getLeaderboardByPoints(50);
        } else {
          response = await leaderboardService.getLeaderboardByStreaks(50);
        }
        setLeaderboard(response.leaderboard);

        const rankResponse = await leaderboardService.getUserRank();
        setUserRank(rankResponse.userStats);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load leaderboard');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [leaderboardType]);

  const getMedalEmoji = (rank: number): string => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Leaderboard 🏆</h1>
          <p className="text-gray-400">
            See how you rank among other developers
          </p>
        </div>

        {/* Your Rank */}
        {userRank && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <StatBox
              icon="⭐"
              label="Your Level"
              value={userRank.level}
              color="purple"
            />
            <StatBox
              icon="🏅"
              label="Rank (Points)"
              value={userRank.rankByPoints}
              color="blue"
            />
            <StatBox
              icon="🔥"
              label="Rank (Streak)"
              value={userRank.rankByStreak}
              color="orange"
            />
          </div>
        )}

        {/* Toggle Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setLeaderboardType('points')}
            className={`px-6 py-2 rounded font-semibold transition ${
              leaderboardType === 'points'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Top by Points
          </button>
          <button
            onClick={() => setLeaderboardType('streaks')}
            className={`px-6 py-2 rounded font-semibold transition ${
              leaderboardType === 'streaks'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Top by Streaks
          </button>
        </div>

        {error && (
          <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : (
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-4 px-6 text-gray-400 font-semibold">
                      Rank
                    </th>
                    <th className="text-left py-4 px-6 text-gray-400 font-semibold">
                      Username
                    </th>
                    <th className="text-center py-4 px-6 text-gray-400 font-semibold">
                      Level
                    </th>
                    <th className="text-center py-4 px-6 text-gray-400 font-semibold">
                      Points
                    </th>
                    <th className="text-center py-4 px-6 text-gray-400 font-semibold">
                      {leaderboardType === 'points' ? 'Streak' : 'Longest Streak'}
                    </th>
                    <th className="text-center py-4 px-6 text-gray-400 font-semibold">
                      Challenges
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry) => (
                    <tr
                      key={entry.userId}
                      className="border-b border-gray-700 hover:bg-gray-700/50 transition"
                    >
                      <td className="py-4 px-6">
                        <span className="text-lg font-bold text-yellow-400">
                          {getMedalEmoji(entry.rank)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-white">
                          {entry.username}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="bg-purple-900 text-purple-200 px-3 py-1 rounded">
                          Lv. {entry.level}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center font-bold text-yellow-400">
                        {entry.totalPoints}
                      </td>
                      <td className="py-4 px-6 text-center font-bold text-orange-400">
                        {leaderboardType === 'points'
                          ? entry.currentStreak
                          : entry.longestStreak}
                        🔥
                      </td>
                      <td className="py-4 px-6 text-center text-blue-400">
                        {entry.totalChallengesCompleted}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
