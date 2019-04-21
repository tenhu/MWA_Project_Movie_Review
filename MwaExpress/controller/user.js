
const User = require('../model/userModel');


module.exports.loadtest = (req,res,next) =>{
     let users = [
     new User({
          username:'Tenhu',
          password:'mwa',
          name:"Ochtulga"
     }),
     new User({
          username:'nghianghesi',
          password:'mwa',
          name:"Ochtulga"
     }),
     new User({
          username:'mohamed',
          password:'mwa',
          name:"Ochtulga"
     })];   
     
     const insertUser = () =>{
          const u = users.pop();
          if(u == null){
               res.status(200).send("Multiple documents inserted to Collection");
          }else{
               u.save((err)=>{
                    if(err){
                         console.log(err);
                    }
                    insertUser();
               });
          }
     };

     insertUser();
}; 

module.exports.gettest = (req,res,next) =>{
     User.find({},(err, data)=>{
          res.status(200).json(data);
     });
}
