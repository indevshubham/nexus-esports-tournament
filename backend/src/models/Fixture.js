import mongoose from 'mongoose';

const fixtureSchema = new mongoose.Schema(
  {
    matchNumber: {
      type: Number,
      required: [true, 'Match number is required'],
      min: 1,
      max: 10,
    },
    teamA: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: [true, 'Team A reference is required'],
    },
    teamB: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: [true, 'Team B reference is required'],
    },
    status: {
      type: String,
      enum: ['UPCOMING', 'IN_PROGRESS', 'COMPLETED'],
      default: 'UPCOMING',
    },
    roundName: {
      type: String,
      default: 'ROUND ROBIN',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Ensure matchNumber is unique across tournament fixtures
fixtureSchema.index({ matchNumber: 1 }, { unique: true });

export const Fixture = mongoose.model('Fixture', fixtureSchema);
