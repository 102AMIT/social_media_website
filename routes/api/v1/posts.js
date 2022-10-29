const express=require('express');

const router=express.Router();

// import passport for authentication
const passport=require('passport');

const postApi=require("../../../controllers/api/v1/posts_api");


router.get('/',postApi.index);
// we dont want session cookies generated for this again that why we put false for session
router.delete('/:id',passport.authenticate('jwt',{session:false}) ,postApi.destroy);

module.exports=router;