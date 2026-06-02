import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
  username?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  isAuthenticated,
  onLogout,
  username,
}) => {
  return (
    <nav className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-blue-500/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              🔥 CodeStreak
            </div>
          </Link>

          {isAuthenticated && (
            <div className="flex items-center gap-6">
              <Link
                to="/dashboard"
                className="text-gray-300 hover:text-blue-400 transition"
              >
                Dashboard
              </Link>
              <Link
                to="/challenge"
                className="text-gray-300 hover:text-blue-400 transition"
              >
                Challenge
              </Link>
              <Link
                to="/leaderboard"
                className="text-gray-300 hover:text-blue-400 transition"
              >
                Leaderboard
              </Link>
              <Link
                to="/profile"
                className="text-gray-300 hover:text-blue-400 transition"
              >
                Profile
              </Link>
              <div className="text-sm text-gray-400 border-l border-gray-600 pl-6">
                {username}
              </div>
              <button
                onClick={onLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
              >
                Logout
              </button>
            </div>
          )}

          {!isAuthenticated && (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-gray-300 hover:text-blue-400 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
