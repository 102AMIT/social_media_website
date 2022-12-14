//routes of user

const express=require('express');
//this router const are within this module
const router=express.Router();

// here we need to export passport
const passport=require('passport');

// get the controller of user

const userController=require('../controllers/users_controller');
//here we are setting the router with controller this router accessing the user controller
//when any request came for user/profile then this route is uses.
//this (/profile) is called maping 
router.get('/profile/:id',passport.checkAuthentication, userController.profile);
router.post('/update/:id',passport.checkAuthentication, userController.update);

router.get('/sign-up',userController.signUp);

router.get('/sign-in',userController.signIn);

// for sign up page

router.post('/create',userController.create);

// this is for manual authontication

// router.post('/create-session',userController.createSession);
// for sign ou
// router.get('/sign-Out',userController.signout);


// if we need to create a session then  we need to create a route
// use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
),userController.createSession)



router.get('/sign-out',userController.destroySession);


// route for google auth
// this route provided by passport /auth/google 
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));

//call back routes

router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),userController.createSession);

//here router is exported it self and access by index . js of app
module.exports=router;

