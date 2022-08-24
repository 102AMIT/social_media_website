const express=require('express');
const port=8001;
const app=express();


// here we are told the sever to view the ejs file 
app.set('view engine','ejs');
app.set('views','./views');



//use express router
//any request came then requir index.routes 

app.use('/',require('./routes'));

//setting  middleware to setup our view engine

app.set('view engine','ejs');
app.set('views','./views');


app.listen(port,function(err){
    if(err){
        console.log(`error in running on server: ${err}`);
    }
    console.log(`server is running on port : ${port}`);
});