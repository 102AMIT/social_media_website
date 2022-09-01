//routes of posts

const express=require('express');
//this router const are within this module
const router=express.Router();

// here we need to import the passport
const passport=require('passport');
const postsController=require('../controllers/posts_controller');
// only the user posting the post we sign in that why we are using passport authentication
// we already cretated passport .checkAuthentication in config folder in passport-local-strategy
router.post('/create',passport.checkAuthentication,postsController.create);


module.exports=router;