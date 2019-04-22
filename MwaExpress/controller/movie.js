
const Movie = require('../model/movieModel');

module.exports.showMovie = (req, res, next) => {
  res.send('good Movie');
};

module.exports.addMovie = (req, res, next) => {

  const title = req.body.title;
  const released = req.body.released;
  const imageUrl = req.body.imageUrl;
  const director = req.body.director;

  const movie = new Movie({
    title: title,
    released: released,
    imageUrl: imageUrl,
    director: director,
    review: {
      reviews: []
    },
    cinema: {
      cinemas: []
    }
  });
  movie
    .save()
    .then(result => {
      console.log('Created Movie');
      res.status(201).json({ success : 1 });
    })
    .catch(err => {
      console.log(err);
    });

}; 

