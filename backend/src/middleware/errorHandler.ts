import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from './auth';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e: any) => e.message);
    res.status(400).json({ message: messages.join(', ') });
    return;
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    res.status(400).json({ message: `${field} already exists` });
    return;
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }

  if (err.name === 'TokenExpiredError') {
    res.status(401).json({ message: 'Token expired' });
    return;
  }

  // Default error
  res
    .status(err.status || 500)
    .json({ message: err.message || 'Internal server error' });
};
