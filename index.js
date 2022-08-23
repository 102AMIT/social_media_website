const express=require('express');
const port=8001;
const app=express();









app.listen(port,function(err){
    if(err){
        console.log(`error in running on server: ${err}`);
    }
    console.log(`server is running on port : ${port}`);
})