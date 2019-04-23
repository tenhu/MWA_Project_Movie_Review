const Movie = require('../model/movieModel');

module.exports.reviewUpdate = (req,res,next) =>{

const id = req.params.id;
const index = req.body.index;

    const userName = req.body.userName;
    const rate = req.body.rate;
    const comment = req.body.comment;
    var review = { userName: userName, rate: rate , comment: comment };


    if(index === 1)
    {
      Movie.update(
       { _id: id ,"review.reviews.userName":userName}, 
       { $set: { "review.reviews.$.rate" : rate ,"review.reviews.$.comment" : comment }},
      function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
        });
       }
       
     else
     {

 Movie.findOneAndUpdate(
     { _id: id }, 
     { $push: { "review.reviews": review  } },
    function (error, success) {
          if (error) {
              console.log("faillllllled");
          } else {
              console.log(success);
          }
      });
  
     }
}; 




  


