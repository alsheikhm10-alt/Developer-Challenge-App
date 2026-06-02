import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 leading-tight">
              Build Your Coding
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Streak 🔥
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Complete daily coding challenges, earn points, build streaks, and
              compete on the leaderboard. Perfect for beginner frontend developers.
            </p>
            <div className="flex gap-4 justify-center">
              {!isAuthenticated ? (
                <>
                  <Button
                    variant="primary"
                    onClick={() => navigate('/register')}
                    className="text-lg px-8 py-3"
                  >
                    Get Started
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => navigate('/login')}
                    className="text-lg px-8 py-3"
                  >
                    Login
                  </Button>
                </>
              ) : (
                <Button
                  variant="success"
                  onClick={() => navigate('/dashboard')}
                  className="text-lg px-8 py-3"
                >
                  Go to Dashboard
                </Button>
              )}
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <Card>
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-white mb-2">
                Daily Challenges
              </h3>
              <p className="text-gray-400">
                New coding challenge every day. Start easy and progress to harder levels.
              </p>
            </Card>

            <Card>
              <div className="text-4xl mb-4">🔥</div>
              <h3 className="text-xl font-bold text-white mb-2">
                Build Streaks
              </h3>
              <p className="text-gray-400">
                Complete challenges consecutively to build an impressive streak.
              </p>
            </Card>

            <Card>
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold text-white mb-2">
                Climb Leaderboard
              </h3>
              <p className="text-gray-400">
                Earn points with each completion and compete with developers worldwide.
              </p>
            </Card>

            <Card>
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-bold text-white mb-2">
                Level Up
              </h3>
              <p className="text-gray-400">
                Gain experience and advance through levels as you complete more challenges.
              </p>
            </Card>

            <Card>
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-bold text-white mb-2">
                Learn & Grow
              </h3>
              <p className="text-gray-400">
                Improve your frontend development skills through practical challenges.
              </p>
            </Card>

            <Card>
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-white mb-2">
                Community
              </h3>
              <p className="text-gray-400">
                Join a community of developers and learn from each other.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { num: 1, title: 'Register', desc: 'Create your account' },
              {
                num: 2,
                title: 'View Challenge',
                desc: "Today's coding challenge awaits",
              },
              { num: 3, title: 'Submit Solution', desc: 'Code, GitHub, or demo' },
              { num: 4, title: 'Earn Points', desc: 'Build streaks & rank up' },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{step.num}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-r from-blue-900 to-cyan-900 border-blue-500">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to start your coding journey?
            </h2>
            <p className="text-blue-100 mb-8">
              Join thousands of developers building their streaks and leveling up.
            </p>
            {!isAuthenticated ? (
              <Button
                variant="success"
                onClick={() => navigate('/register')}
                className="text-lg px-8 py-3"
              >
                Join Now
              </Button>
            ) : (
              <Button
                variant="success"
                onClick={() => navigate('/dashboard')}
                className="text-lg px-8 py-3"
              >
                Go to Dashboard
              </Button>
            )}
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700 py-8 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2024 CodeStreak. Built for developers, by developers. 🔥</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
