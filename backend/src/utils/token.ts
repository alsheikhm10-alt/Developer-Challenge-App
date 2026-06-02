import jwt from 'jsonwebtoken';

export const generateToken = (id: string, email: string, isAdmin: boolean = false): string => {
  return jwt.sign(
    { id, email, isAdmin },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch (error) {
    return null;
  }
};

export const getDayStartEnd = (date: Date = new Date()) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  return { start, end };
};

export const calculateLevel = (points: number): number => {
  return Math.floor(points / 100) + 1;
};
