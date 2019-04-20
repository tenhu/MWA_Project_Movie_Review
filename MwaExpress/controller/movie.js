
const Movie = require('../model/movieModel');

module.exports.showMovie = (req,res,next) =>{
     res.send('good Movie');
}; 

module.exports.addMovie = (req,res,next) =>{

     const movie = new Movie({
          title: "Interstellar1",
          description: "Good Movie1"
        });
        movie
          .save()
          .then(result => {
            console.log('Created Movie');
            res.send('added');
          })
          .catch(err => {
            console.log(err);
          });
    
}; 