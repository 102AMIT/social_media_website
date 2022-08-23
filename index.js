const express=require('express');
const port=8001;
const app=express();


// here we are told the sever to view the ejs file 
app.set('view engine','ejs');
app.set('view','./views');



//use express router

app.use('/',require('./routes'));




app.listen(port,function(err){
    if(err){
        console.log(`error in running on server: ${err}`);
    }
    console.log(`server is running on port : ${port}`);
});