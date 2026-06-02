import React from 'react';
import { Challenge } from '../types';
import Card from './Card';

interface ChallengeCardProps {
  challenge: Challenge;
  onViewDetails?: (challenge: Challenge) => void;
  isCompleted?: boolean;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  challenge,
  onViewDetails,
  isCompleted,
}) => {
  const difficultyColors = {
    Easy: 'bg-green-900 text-green-200',
    Medium: 'bg-yellow-900 text-yellow-200',
    Hard: 'bg-red-900 text-red-200',
  };

  return (
    <Card className="cursor-pointer hover:shadow-lg hover:shadow-blue-500/20">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">
            {challenge.title}
          </h3>
          <p className="text-gray-400 text-sm line-clamp-2 mb-4">
            {challenge.description}
          </p>
        </div>
        {isCompleted && (
          <div className="text-2xl ml-4">✅</div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded ${
            difficultyColors[challenge.difficulty]
          }`}
        >
          {challenge.difficulty}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-yellow-400 font-bold">
            +{challenge.pointsReward} pts
          </span>
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(challenge)}
              className="text-blue-400 hover:text-blue-300 text-sm font-semibold ml-2"
            >
              View →
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ChallengeCard;
