import { Response } from 'express';
import { Submission } from '../models/Submission';
import { Challenge } from '../models/Challenge';
import { User } from '../models/User';
import { AuthRequest } from '../middleware/auth';
import { getTodayDate, calculateLevel } from '../utils/helpers';

export const submitChallenge = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { challengeId, textAnswer, githubLink, liveDemoLink } = req.body;
    const userId = req.user!.id;

    // Check if challenge exists
    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      res.status(404).json({ message: 'Challenge not found' });
      return;
    }

    // Check if user already submitted today
    const today = getTodayDate();
    const existingSubmission = await Submission.findOne({
      userId,
      challengeId,
      submittedAt: { $gte: today },
    });

    if (existingSubmission) {
      res.status(400).json({ message: 'You have already submitted for this challenge today' });
      return;
    }

    // Create submission
    const submission = new Submission({
      userId,
      challengeId,
      textAnswer,
      githubLink,
      liveDemoLink,
      status: 'pending',
    });

    await submission.save();
    await submission.populate([
      { path: 'userId', select: 'name email' },
      { path: 'challengeId', select: 'title points' },
    ]);

    res.status(201).json({
      message: 'Submission created successfully',
      submission,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUserSubmissions = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user!.id;
    const submissions = await Submission.find({ userId })
      .populate({ path: 'challengeId', select: 'title difficulty category points' })
      .sort({ submittedAt: -1 });

    res.json({ submissions });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllSubmissions = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { status } = req.query;
    let query: any = {};
    if (status) query.status = status;

    const submissions = await Submission.find(query)
      .populate({ path: 'userId', select: 'name email' })
      .populate({ path: 'challengeId', select: 'title points' })
      .sort({ submittedAt: -1 });

    res.json({ submissions });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const approveSubmission = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const submission = await Submission.findById(id).populate('challengeId');
    if (!submission) {
      res.status(404).json({ message: 'Submission not found' });
      return;
    }

    if (submission.status !== 'pending') {
      res.status(400).json({ message: 'Only pending submissions can be approved' });
      return;
    }

    const challenge = submission.challengeId as any;
    submission.status = 'approved';
    submission.pointsAwarded = challenge.points;
    await submission.save();

    // Update user points and streak
    const user = await User.findById(submission.userId);
    if (user) {
      user.points += challenge.points;
      user.level = calculateLevel(user.points);

      // Update streak
      const today = getTodayDate();
      const lastSubmissionDate = user.lastCompletedDate ? new Date(user.lastCompletedDate) : null;
      lastSubmissionDate?.setHours(0, 0, 0, 0);

      if (lastSubmissionDate && lastSubmissionDate.getTime() === today.getTime()) {
        // Already submitted today, don't change streak
      } else if (
        lastSubmissionDate &&
        lastSubmissionDate.getTime() === today.getTime() - 24 * 60 * 60 * 1000
      ) {
        // Submitted yesterday, continue streak
        user.currentStreak += 1;
        if (user.currentStreak > user.longestStreak) {
          user.longestStreak = user.currentStreak;
        }
      } else {
        // Break in streak
        user.currentStreak = 1;
      }

      user.lastCompletedDate = new Date();
      await user.save();
    }

    await submission.populate([
      { path: 'userId', select: 'name email' },
      { path: 'challengeId', select: 'title points' },
    ]);

    res.json({
      message: 'Submission approved successfully',
      submission,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const rejectSubmission = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const submission = await Submission.findById(id);
    if (!submission) {
      res.status(404).json({ message: 'Submission not found' });
      return;
    }

    if (submission.status !== 'pending') {
      res.status(400).json({ message: 'Only pending submissions can be rejected' });
      return;
    }

    submission.status = 'rejected';
    await submission.save();

    await submission.populate([
      { path: 'userId', select: 'name email' },
      { path: 'challengeId', select: 'title points' },
    ]);

    res.json({
      message: 'Submission rejected successfully',
      submission,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
