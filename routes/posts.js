//routes of posts

const express=require('express');
//this router const are within this module
const router=express.Router();


const postsController=require('../controllers/posts_controller');

router.post('/create',postsController.create);


module.exports=router;