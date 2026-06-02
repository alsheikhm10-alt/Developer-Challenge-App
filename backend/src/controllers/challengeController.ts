import { Response } from 'express';
import { Challenge } from '../models/Challenge';
import { AuthRequest } from '../middleware/auth';
import { getTodayDate } from '../utils/helpers';

export const getTodayChallenge = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    void req;
    const today = getTodayDate();
    const challenge = await Challenge.findOne({
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    }).populate('createdBy', 'name');

    if (!challenge) {
      res.status(404).json({ message: 'No challenge for today' });
      return;
    }

    res.json({ challenge });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllChallenges = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { difficulty, category, sort } = req.query;

    let query: any = {};
    if (difficulty) query.difficulty = difficulty;
    if (category) query.category = category;

    let sortOption: any = { date: -1 };
    if (sort === 'points') sortOption = { points: -1 };

    const challenges = await Challenge.find(query)
      .sort(sortOption)
      .populate('createdBy', 'name');

    res.json({ challenges });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getChallengeById = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const challenge = await Challenge.findById(id).populate('createdBy', 'name');

    if (!challenge) {
      res.status(404).json({ message: 'Challenge not found' });
      return;
    }

    res.json({ challenge });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createChallenge = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { title, description, difficulty, category, points, estimatedTime, date } =
      req.body;

    const challenge = new Challenge({
      title,
      description,
      difficulty,
      category,
      points,
      estimatedTime,
      date,
      createdBy: req.user!.id,
    });

    await challenge.save();
    await challenge.populate('createdBy', 'name');

    res.status(201).json({
      message: 'Challenge created successfully',
      challenge,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateChallenge = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, difficulty, category, points, estimatedTime, date } =
      req.body;

    const challenge = await Challenge.findByIdAndUpdate(
      id,
      {
        title,
        description,
        difficulty,
        category,
        points,
        estimatedTime,
        date,
      },
      { new: true, runValidators: true }
    );

    if (!challenge) {
      res.status(404).json({ message: 'Challenge not found' });
      return;
    }

    res.json({
      message: 'Challenge updated successfully',
      challenge,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteChallenge = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const challenge = await Challenge.findByIdAndDelete(id);
    if (!challenge) {
      res.status(404).json({ message: 'Challenge not found' });
      return;
    }

    res.json({ message: 'Challenge deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
