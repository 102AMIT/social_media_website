const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');


passport.use(new googleStrategy({
        clientID:"592798296013-gmdq5djqgmo063ohq3uvkraqsaimc5bh.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL:"https://localhost:8001/users/auth/google/callback",
    },function(accessToken,refreshToken,profile,done){
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log('error in google Stretegy-passport',err);
                return;
            }
            console.log(profile);
            if(user){
                return done(null,user);
            }else{
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){
                        console.log('error in creating user google Stretegy-passport',err);
                        return;
                    }
                    return done(null,user);
                });
            }

        });
    }
));

module.exports=passport;