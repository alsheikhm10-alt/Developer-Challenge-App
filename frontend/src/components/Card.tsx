import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-blue-500/50 transition ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
