
var jwt = require('jsonwebtoken');
const settings = require('../hidden');

module.exports.login = (req,res,next) =>{
    var token = jwt.sign({ 
        userid:'1' ,
        username:'test',
        exp: Math.floor(Date.now() / 1000) + (60 * 20) //expired 20min.
    }, settings.jwtsecretekey);
    res.status(200).json({
        userinfo:{        
            userid:'1' ,
            username:'test',
            photo:''
            /// more info here.        
        }, 
        jwt:token});
}; 
