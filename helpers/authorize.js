const jwt = require('express-jwt');
//const { secret } = require('./config.json');
//const secret = "process.env.JWT_SECRET";

module.exports = authorize; 

function authorize(roles = []) {
    if(typeof roles === 'string'){
        roles = [roles]; 
    }

    return [
        jwt({secret: process.env.JWT_SECRET, algorithms: ['HS256']}),

        //authorize based on user role
        (req, res, next) => {
            if(roles.length && !roles.includes(req.user.role)){
                return res.status(401).json({message: 'Unauthorized'}); 
            }

            //authentication and authorization sucessful
            next();
        }
    ];
}
