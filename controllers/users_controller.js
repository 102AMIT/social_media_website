//require user for mongodb schema for use the object functionlity

const User = require("../models/user");

// for remove the file when upload a new file

const fs=require('fs');
const path=require('path');


//here profile is Action to link with router of user profile
module.exports.profile = function (req, res) {
  User.findById(req.params.id,function(err,user){

    return res.render('user_profile', {
      title: 'User-profile',
      profile_user:user
  });


  });


  //this is for manual authontication

  // if(req.cookies.user_id){
  //   User.findById(req.cookie.user_id,function(err,user){
  //     if(user){
  //       return res.render("user_profile", {
  //         title: "User-profile",
  //         user:user
  //       })
  //     }
  //     else{
  //       return res.redirect('/users/sign-in');
  //     }
  //   });
  // }
  // else{
  //   return res.redirect('/users/sign-in');
  // }

  //this controller is ready to access by a router
};

// added action over here
module.exports.update= async function(req,res){
  // if(req.user.id ==req.params.id){
  //   User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
  //     return res.redirect('back');
  //   });
  // }else{
  //   return res.status(401).send('Unauthorized');
  //   // now we need to crete a routes
  // }

  if(req.user.id == req.params.id){

    try{

        let user=await User.findById(req.params.id);
        User.uploadedAvatar(req,res,function(err){
            if(err){
              console.log('****Multer Error****: ',err);
            }
            // console.log(req.body);
            // console.log(req.params);
            // console.log(req);
            // console.log(req.sessionStore.options['mongoUrl']);
            user.name=req.body.name;
            user.email=req.body.email;

            if(req.file){

              // handle the profile upload case when we change the profile the profile photo is not repalce now the bug we are handle their 

              if(user.avatar){
                // for unlink the previous image from db
                fs.unlinkSync(path.join(__dirname, '..' , user.avatar));
              }

              // **************************************************

              // // if the avatar is deleted then we need to remove the id and 
              // if(user.avatar==""){
              //   fs.linkSync(path.join(__dirname, '..' , user.avatar+req.file.filename))
              // }

              // this is saving the path of the uploaded file into the avatar field in the user
              
              user.avatar=User.avatarPath + '/' +req.file.filename;
              
            }
            // saving the user
            user.save();
            return res.redirect('back');
        }); 

    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }

  }else{
    req.flash('error','Unauthorized');
    return res.status(401).send('Unauthorized');
  }
}

//we need to add action over here

//render the signUp page
module.exports.signUp = function (req, res) {
  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  }
  return res.render("user_sign_up", {
    title: "Codeial:User SignUp",
  });
};

//render the signIn page
module.exports.signIn = function (req, res) {

  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  }

  return res.render("user_sign_in", {
    title: "Codeial:User SignIn",
  });
};

// get the sign up data from user_sign_up
module.exports.create = function (req, res) {
  // here we first check password are same or not if not then rediect to signup page
  //this is in body param so we wirte req.body
  //   console.log(req.body);
  if (req.body.password != req.body.Confirm_Password) {
    return res.redirect("back");
  }

  //if the password are same then we need to find the user id is present or not if it's exist then we dont create if don't exist then we need to create

  //we need to import the model ../models/user at the top
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding user in singing up");
      return;
    }

    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error in creating user while singing up");
          return;
        }
        // here we ae redirect to route url
        return res.redirect("/users/sign-in");
      });
    }
    // if user is already present
    else {
      return res.redirect("back");
    }
  });
};

// set up a action for sing in and create a session for user
module.exports.createSession = function (req, res) {
req.flash('success','Logged in Successfully');
// here we are using passport js 
return res.redirect('/');
// after that we need to go to the routes the user




//this code we are writing for manual authentication

// step to authenticate    
// find the user

// User.findOne({email:req.body.email},function(err,user){
//     if(err){
//         console.log('error in finding user in singing in');
//         return;
//     }
//     // handle user found
    
//     if(user){
//         console.log("im user");
//         // handle password which doesn't match
//         if(user.password != req.body.password){
//             return res.redirect('back');
//         }

//         // handle session creation

//         res.cookie('user_id',user.id);
//         console.log(user.id);
        
//         return res.redirect('/users/profile');

//     }
//     else{
//         // handle user not found
//         return res.redirect('back');
//     }
// })

};

// for manual authentication

// sign out in user profile ,here when we click on sihgn out then simply we remove cookies from db 

// module.exports.signout=function(req,res){

//     //clear cookie is also a predefien function were we remove the cookie from browser
//     res.clearCookie('user_id');
//     return res.redirect('back');
// }


// for sign in sign out button

module.exports.destroySession=('/logout', function(req, res, next) {
  // logout is a pre defined  function passport give it to express
  req.logout(function(err) {
    if (err) { return next(err); }
    req.flash('success','You have Logged out !');
    res.redirect('/');
  });
});