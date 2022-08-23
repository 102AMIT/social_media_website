const express=require('express');

const router=express.Router();

const homeController=require('../controllers/home_controller');

router.get('/',homeController.home);


// here we are exporting the router
module.exports=router;
