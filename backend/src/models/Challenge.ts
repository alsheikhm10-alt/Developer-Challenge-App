import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IChallenge extends Document {
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'HTML' | 'CSS' | 'JavaScript' | 'React' | 'TypeScript' | 'Git' | 'Portfolio' | 'Interview';
  points: number;
  estimatedTime: number;
  date: Date;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const challengeSchema = new Schema<IChallenge>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a challenge title'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a challenge description'],
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: [true, 'Please specify a difficulty level'],
    },
    category: {
      type: String,
      enum: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Git', 'Portfolio', 'Interview'],
      required: [true, 'Please specify a category'],
    },
    points: {
      type: Number,
      required: [true, 'Please specify points'],
      min: [10, 'Points must be at least 10'],
      max: [500, 'Points cannot exceed 500'],
    },
    estimatedTime: {
      type: Number,
      required: [true, 'Please specify estimated time in minutes'],
      min: [5, 'Estimated time must be at least 5 minutes'],
    },
    date: {
      type: Date,
      required: [true, 'Please provide a date for the challenge'],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const Challenge = mongoose.model<IChallenge>('Challenge', challengeSchema);
