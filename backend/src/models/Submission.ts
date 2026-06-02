import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ISubmission extends Document {
  userId: Types.ObjectId;
  challengeId: Types.ObjectId;
  textAnswer?: string;
  githubLink?: string;
  liveDemoLink?: string;
  status: 'pending' | 'approved' | 'rejected';
  pointsAwarded: number;
  submittedAt: Date;
  updatedAt: Date;
}

const submissionSchema = new Schema<ISubmission>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    challengeId: {
      type: Schema.Types.ObjectId,
      ref: 'Challenge',
      required: true,
    },
    textAnswer: {
      type: String,
    },
    githubLink: {
      type: String,
      match: [
        /^(https?:\/\/)?(www\.)?github\.com\/.+/,
        'Please provide a valid GitHub link',
      ],
    },
    liveDemoLink: {
      type: String,
      match: [/^https?:\/\/.+/, 'Please provide a valid URL'],
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    pointsAwarded: {
      type: Number,
      default: 0,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Compound index to prevent duplicate submissions for same user/challenge on same day
submissionSchema.index({ userId: 1, challengeId: 1 });

export const Submission = mongoose.model<ISubmission>('Submission', submissionSchema);
