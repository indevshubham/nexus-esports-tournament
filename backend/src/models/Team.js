import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Player name is required'],
      trim: true,
      minlength: [1, 'Player name cannot be empty'],
    },
  },
  { _id: true }
);

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Team name is required'],
      trim: true,
      minlength: [1, 'Team name cannot be empty'],
    },
    players: {
      type: [playerSchema],
      required: [true, 'Players roster is required'],
      validate: {
        validator: function (val) {
          return Array.isArray(val) && val.length === 5;
        },
        message: 'A squad must consist of exactly 5 active players',
      },
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

// Pre-validate hook to check non-empty and duplicate player names inside team
teamSchema.pre('validate', function (next) {
  if (this.name) {
    this.name = this.name.trim();
  }

  if (Array.isArray(this.players)) {
    const seen = new Set();
    for (const player of this.players) {
      if (!player.name || !player.name.trim()) {
        this.invalidate('players', 'All 5 player names must be non-empty strings');
        break;
      }
      player.name = player.name.trim();
      const lower = player.name.toLowerCase();
      if (seen.has(lower)) {
        this.invalidate('players', `Duplicate player name "${player.name}" within squad`);
        break;
      }
      seen.add(lower);
    }
  }
  next();
});

teamSchema.index(
  { name: 1 },
  {
    unique: true,
    collation: { locale: 'en', strength: 2 },
  }
);

export const Team = mongoose.model('Team', teamSchema);
