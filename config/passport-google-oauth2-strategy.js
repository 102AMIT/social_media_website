const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID:"592798296013-gmdq5djqgmo063ohq3uvkraqsaimc5bh.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL:"http://localhost:8001/users/auth/google/callback",
    },function(accessToken,refreshToken,profile,done){
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){console.log('error in google Stretegy-passport',err);return;}
            console.log(profile);
            if(user){
                // if found ,set this user as req.user
                return done(null,user);
            }else{
                // if not found ,set the user and set it as req.user
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    // here we are using crypto js for decrept the password
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