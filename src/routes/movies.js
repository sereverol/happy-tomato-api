const express = require('express');
const router = express.Router();
const request = require('request');

const Movie = require('../models/Movie');

// Search by title
router.get('/search', async (req, res) => {
  const { name } = req.body;
  try {
    // const search = Movie.find({
    //   title: { $regex: (), $options: 'i' },
    // });
    Movie.find([
      {
        $search: {
          index: 'movieIndex',
          text: {
            query: 'about time',
            path: {
              wildcard: '*',
            },
          },
        },
      },
    ]);
    console.log(search);
  } catch (err) {
    console.error(err);
  }
});

// Retrieve all movies from db
// -todo handle error
router.get('/', async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

// Save movies in the db
router.post('/add-movies', async (req, res) => {
  const { name } = req.body;

  try {
    const options = {
      uri: `http://www.omdbapi.com/?t=${name}&apikey=d621115c`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };

    request(options, async (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        return res.status(400).json({ msg: 'No Movie Found' });
      } else if (response.statusCode == 200) {
        const movieJSON = JSON.parse(body);
        movie = new Movie({
          title: movieJSON.Title,
          year: movieJSON.Year,
          rated: movieJSON.Rated,
          released: movieJSON.Released,
          runtime: movieJSON.Runtime,
          genre: movieJSON.Genre,
          director: movieJSON.Director,
          writer: movieJSON.Writer,
          actors: movieJSON.Actors,
          plot: movieJSON.Plot,
          poster: movieJSON.Poster,
          imdbrating: movieJSON.imdbRating,
          imdbid: movieJSON.imdbID,
          type: movieJSON.Type,
          boxoffice: movieJSON.BoxOffice,
        });
        await movie.save();
        res.json(JSON.parse(body));
      }
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
