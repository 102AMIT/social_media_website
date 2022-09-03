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

// we need to create a route for delete post and and comment 
router.get('/destroy/:id',passport.checkAuthentication,postsController.destroy);
// after that we need to update our ejs for destroy
module.exports=router;