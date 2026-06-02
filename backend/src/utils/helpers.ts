import jwt from 'jsonwebtoken';

export const generateToken = (id: string, role: 'user' | 'admin'): string => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

export const calculateLevel = (points: number): number => {
  return Math.floor(points / 100) + 1;
};

export const getTodayDate = (): Date => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
};
