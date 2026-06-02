import { Router } from 'express';
import {
  getTodayChallenge,
  getAllChallenges,
  getChallengeById,
  createChallenge,
  updateChallenge,
  deleteChallenge,
} from '../controllers/challengeController';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { body } from 'express-validator';

const router = Router();

// Validation rules
const createChallengeValidation = [
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
  body('date').isISO8601().withMessage('Valid date is required'),
];

// Routes
router.get('/today', authenticate, getTodayChallenge);
router.get('/', authenticate, getAllChallenges);
router.get('/:id', authenticate, getChallengeById);
router.post('/', authenticate, authorize(['admin']), createChallengeValidation, validate, createChallenge);
router.put('/:id', authenticate, authorize(['admin']), updateChallenge);
router.delete('/:id', authenticate, authorize(['admin']), deleteChallenge);

export default router;
