//routes of user

const express=require('express');
//this router const are within this module
const router=express.Router();

// get the controller of user

const userController=require('../controllers/users_controller');
//here we are setting the router with controller this router accessing the user controller
//when any request came for user/profile then this route is uses.
//this (/profile) is called maping 
router.get('/profile',userController.profile);

router.get('/sign-up',userController.signUp);

router.get('/sign-in',userController.signIn);

// for sign up page

router.post('/create',userController.create);

router.post('/create-session',userController.createSession);

//here router is exported it self and access by index.js of app

module.exports=router;

