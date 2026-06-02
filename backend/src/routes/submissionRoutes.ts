import { Router } from 'express';
import {
  submitChallenge,
  getUserSubmissions,
  getAllSubmissions,
  approveSubmission,
  rejectSubmission,
} from '../controllers/submissionController';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { body } from 'express-validator';

const router = Router();

// Validation rules
const createSubmissionValidation = [
  body('challengeId').isMongoId().withMessage('Valid challenge ID is required'),
  body()
    .custom((value, { req }) => {
      const { textAnswer, githubLink, liveDemoLink } = req.body;
      if (!textAnswer && !githubLink && !liveDemoLink) {
        throw new Error('At least one submission method is required');
      }
      return true;
    }),
  body('githubLink')
    .optional()
    .isURL()
    .withMessage('GitHub link must be a valid URL'),
  body('liveDemoLink')
    .optional()
    .isURL()
    .withMessage('Demo link must be a valid URL'),
];

// Routes
router.post('/', authenticate, createSubmissionValidation, validate, submitChallenge);
router.get('/me', authenticate, getUserSubmissions);
router.get('/', authenticate, authorize(['admin']), getAllSubmissions);
router.patch('/:id/approve', authenticate, authorize(['admin']), approveSubmission);
router.patch('/:id/reject', authenticate, authorize(['admin']), rejectSubmission);

export default router;
