const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    text: true,
  },
  year: {
    type: String,
    required: true,
  },
  rated: {
    type: String,
    required: true,
  },
  released: {
    type: String,
    required: true,
  },
  runtime: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  writer: {
    type: String,
    required: true,
  },
  actors: {
    type: String,
    required: true,
  },
  plot: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  imdbrating: {
    type: String,
    required: true,
  },
  imdbid: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  boxoffice: {
    type: String,
    required: false,
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Movie = mongoose.model('movie', MovieSchema);
