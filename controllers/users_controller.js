//here profile is Action to link with router of user profile
module.exports.profile=function(req,res){

    return res.render('user_profile',{
        title:"User-profile"
    })

//this controller is ready to access by a router
}

//we need to add action over here

//render the signUp page
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title:"Codeial:User SignUp"
    })
};

//render the signIn page
module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title:"Codeial:User SignIn"
    })
}

// get the sign up data from user_sign_up
module.exports.create=function(req,res){
    //TODO later
}

// set up a action for sing in and create a session for user
module.exports.createSession=function(req,res){
    // TODO later
}


