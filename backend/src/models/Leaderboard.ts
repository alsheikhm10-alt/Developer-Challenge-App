import mongoose, { Document, Schema } from 'mongoose';

interface ILeaderboard extends Document {
  userId: mongoose.Types.ObjectId;
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  rank: number;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    totalPoints: {
      type: Number,
      default: 0,
    },
    currentStreak: {
      type: Number,
      default: 0,
    },
    longestStreak: {
      type: Number,
      default: 0,
    },
    rank: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: false,
  }
);

leaderboardSchema.index({ totalPoints: -1 });
leaderboardSchema.index({ currentStreak: -1 });

export const Leaderboard = mongoose.model<ILeaderboard>(
  'Leaderboard',
  leaderboardSchema
);
export type { ILeaderboard };
