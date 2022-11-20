const passport=require('passport');

const JWTStrategy=require('passport-jwt').Strategy;

const ExtractJWT=require('passport-jwt').ExtractJwt;
const User = require('../models/user');


let opts={
    // hear hearder is a key called authorizetion nad here Bearer having the JWT token 
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codeial'

}
// for authonticate JWT
passport.use(new JWTStrategy(opts,function(jwtPayLoad,done){

    User.findById(jwtPayLoad._id,function(err,user){

        console.log(jwtPayLoad._id);
        if(err){console.log('Error finding user from JWT');return;}

        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }

    })

}));

module.exports=passport;