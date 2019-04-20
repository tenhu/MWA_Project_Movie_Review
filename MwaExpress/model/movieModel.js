const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const movieSchema = new Schema({
     title: {
         type: String,
         required: true
     },
     description: {
         type: String,
         required:true
     }
 });

 movieSchema.methods.addMovie = function (newUserName, newComment) {

     console.log('called: addComment');
     const updatedComments = [...this.comment.comments];
 
     updatedComments.push({
         userName: newUserName,
         userComment: newComment
       });
 
     const updatedComment = {
         comments: updatedComments
       };
       this.comment = updatedComment;
       return this.save();
 }
 
 module.exports = mongoose.model('Movies', movieSchema); 