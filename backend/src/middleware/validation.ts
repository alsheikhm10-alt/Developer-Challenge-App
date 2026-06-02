import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      message: 'Validation error',
      errors: errors.array().map((e) => ({
        field: e.type === 'field' ? (e as any).path : undefined,
        message: e.msg,
      })),
    });
    return;
  }
  next();
};

// Auth validators
export const registerValidation = [
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

export const loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

// Challenge validators
export const createChallengeValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('difficulty')
    .isIn(['beginner', 'intermediate', 'advanced'])
    .withMessage('Invalid difficulty level'),
  body('category')
    .isIn(['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Git', 'Portfolio', 'Interview'])
    .withMessage('Invalid category'),
  body('points')
    .isInt({ min: 10, max: 500 })
    .withMessage('Points must be between 10 and 500'),
  body('estimatedTime')
    .isInt({ min: 5 })
    .withMessage('Estimated time must be at least 5 minutes'),
  body('date').isISO8601().withMessage('Invalid date format'),
];

// Submission validators
export const createSubmissionValidation = [
  body('challengeId')
    .isMongoId()
    .withMessage('Invalid challenge ID'),
  body()
    .custom((value) => {
      const { textAnswer, githubLink, liveDemoLink } = value;
      if (!textAnswer && !githubLink && !liveDemoLink) {
        throw new Error('At least one submission method is required');
      }
      return true;
    }),
];
