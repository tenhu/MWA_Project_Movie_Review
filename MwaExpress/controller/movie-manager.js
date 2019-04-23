const Movie = require('../model/movieModel');
const itemperpage = 20;
const log = require('log4node');

module.exports.list=(req,res,next)=>{
    let page = req.params.page;
    if(page==null){
        page=1;
    }
    Movie.paginate({},{ page: page, limit: itemperpage })
    .then((result)=>{
        res.status(200).json(result);
    })
    .catch((err)=>{
        log.error(err);
        next("Query failed");
    });
};

module.exports.get=(req,res,next)=>{
  let id = req.params.id;
  Movie.findById(id)
  .then((m)=>{
    if(m!=null){
      res.status(200).json({succeeded:true, data:m});
    }else{
      res.status(400).json({error:"Movie not found"});
    }
  })
  .catch((err)=>{
      log.error(err);
      next("Query failed");
  });
};

module.exports.add=(req,res,next)=>{
    let m = new Movie({
        title: req.body.title,
        released: req.body.released,
        imageUrl: req.body.imageUrl,
        director: req.body.director,
        type: req.body.director,
        descripton:req.body.descripton,
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
          res.status(201).json({ succeeded : true });
        })
        .catch(err => {
          log.error(err);
          next("Save error");
        });
};


module.exports.update = (req,res,next)=>{
    let id = req.params.id;
    Movie.findByIdAndUpdate(id,{
        title: req.body.title,
        released: req.body.released,
        imageUrl: req.body.imageUrl,
        director: req.body.director,
        type: req.body.director,
        descripton:req.body.descripton
      },(err,doc)=>{
          if(err){
            log.error(err);
            next("Save error");
          }else{
            if(doc!=null){
                res.status(200).json({succeeded:true});
            }else{
                next({code:404,message:"Movie not foud"});
            }
          }
      });
};

module.exports.delete = (req,res,next)=>{
    Movie.findByIdAndDelete(id,
        (err,doc)=>{
            if(err){
                log.error(err);
                next("Save error");
              }else{
                if(doc!=null){
                    res.status(200).json({succeeded:true});
                }else{
                    next({code:404,message:"Movie not foud"});
                }
              }    
        });
};

