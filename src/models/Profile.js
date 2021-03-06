const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  favoritemovies: [
    {
      movie: {
        type: Schema.Types.ObjectId,
        ref: 'movie',
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  website: {
    type: String,
  },
  bio: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
