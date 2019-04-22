
const jwt = require('jsonwebtoken');
const settings = require('../hidden');

module.exports = (grantedRoles)=>{
    return (req,res,next)=>{
    let token = req.get('Authorization');
    if(token != null && token > ''){
        token = token.slice(token.indexOf(' ') + 1, token.length);//remove prefix like Bearer,JWT...
        jwt.verify(token, settings.jwtsecretekey, function(err, decoded){
            if(!err && decoded){
                    req.user = decoded;
                    if(grantedRoles==null || grantedRoles == "*"){
                        return next();
                    }
                    req.user.roles.forEach((r)=>{
                        if(grantedRoles == r || grantedRoles.indexOf(r)>=0){
                            return next();
                        }
                    });  
            }else{
                return next(err.message);
            }
            return next("Access denied");
        });
    }else{
        return next("Access denied");
    }
}
}