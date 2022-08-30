
// we need to install passport: npm install passport
// then we need to install passport local : npm install passport-local
// passport js use seesion cookies .session cookies store the session information and it's encrypted

const passport=require('passport');
// strategy is the property we need to require from passport-local
const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/user');

// we are creating new local Strategy and we need to tell passport to use it
// authentication using passport
passport.use(new LocalStrategy({
    // usernameField is syntax are here we are pass email because email is unique
        usernameField:'email'
    },
    // done is inbuilt to passport it's call back function
    function(email,password,done){
        // find the user and establish the identity
        // here we need to import user

        User.findOne({email:email},function(err,user){
            if(err){
                console.log('Error in finding user--> Passport');
                return done(err);
            }
            if(!user || user.password != password){
                console.log('Invalid Username/Password');
                return done(null,false);
            }
            // null means no error
            return done(null,user);
        });

    }

));

// serializing the user to decide which key is kept in the cookies
// serializing and deserializing is the pre defined function in the cookies
// here passport set the user into cookies
passport.serializeUser(function(user,done){
    done(null,user.id)
})

// deserializing the user from the key in the cookies
// cookies send to the browser then browers set back the user id then we need to deserialize it
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding the user id in -->Passport');
            return done(err);
        }
        return done(null,user);
    });

});


// we create our passport now we need to export its

module.exports=passport;