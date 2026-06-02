import React from 'react';

interface StatBoxProps {
  icon: string;
  label: string;
  value: string | number;
  color?: string;
}

const StatBox: React.FC<StatBoxProps> = ({
  icon,
  label,
  value,
  color = 'blue',
}) => {
  const colorMap: Record<string, string> = {
    blue: 'from-blue-600 to-blue-400',
    green: 'from-green-600 to-green-400',
    purple: 'from-purple-600 to-purple-400',
    orange: 'from-orange-600 to-orange-400',
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-blue-500/50 transition">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{label}</p>
          <p className={`text-3xl font-bold mt-2 text-transparent bg-clip-text bg-gradient-to-r ${colorMap[color]}`}>
            {value}
          </p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
};

export default StatBox;
