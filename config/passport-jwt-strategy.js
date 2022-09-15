const passport=require('passport');
const User = require('../models/user');

const JWTStrategy=require('passport-jwt').Strategy;

const ExtractJWT=require('passport-jwt').ExtractJwt;


let opts={
    // hear hearder is a key called authorizetion nad here Bearer having the JWT token 
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey : 'codeial'

}
// for authonticate JWT
passport.use(new JWTStrategy(opts,function(jwtPayload,done){

    User.findById(jwtPayload._id,function(err,user){
        if(err){console.log('Error finding user from JWT');return;}

        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }

    })

}));

module.exports=passport;