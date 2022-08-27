//require user for mongodb schema for use the object functionlity
const User = require("../models/user");
//here profile is Action to link with router of user profile
module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "User-profile",
  });

  //this controller is ready to access by a router
};

//we need to add action over here

//render the signUp page
module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "Codeial:User SignUp",
  });
};

//render the signIn page
module.exports.signIn = function (req, res) {
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
  // TODO later
};
