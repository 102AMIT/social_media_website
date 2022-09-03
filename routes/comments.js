//routes of comments

const express=require('express');
//this router const are within this module
const router=express.Router();

// here we need to import the passport
const passport=require('passport');
const commentsController=require('../controllers/comments_controller');
// only the user posting the post we sign in that why we are using passport authentication
// we already cretated passport .checkAuthentication in config folder in passport-local-strategy
router.post('/create',passport.checkAuthentication,commentsController.create);

// creting route for delete comment 

router.get('/destroy/:id',passport.checkAuthentication,commentsController.destroy);

// after we we need to tell the main router index.js if the request is comming for comment then use this route

module.exports=router;