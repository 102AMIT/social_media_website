const express=require('express');

const router=express.Router();

const homeController=require('../controllers/home_controller');


//this router accessing the homeController this is index router this router is controlling all the other routes
//for homepage we set homeController.home 
router.get('/',homeController.home);

//here we are set as master route to controll all the other routes

//when the request for the user we need to tell use your neighbour 
//if the req came for users then use this routes
router.use('/users',require('./users'));

// for post

router.use('/posts',require('./posts'));


// here we are exporting the router
module.exports=router;
