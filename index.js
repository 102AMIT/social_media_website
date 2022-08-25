const express=require('express');
const port=8001;
const app=express();
//we are now intalling the layout ejs library and create a folder on views of layout.ejs
//terminal command for install the layout library is : npm install express-ejs-layouts
// here we are reqiure the lauout library
const expressLayouts=require('express-ejs-layouts');
//here we require mongoose
const db=require('./config/mongoose');

//we are using asset file here by giving the folder address
app.use(express.static('./assets'));

// we need to tell the app to use it
// we need to put before our routes in the routes the views and going to be render before that we need to tell all the views are goinf to be render belong to some sort of layout or a function which can define which layout is use 
app.use(expressLayouts);

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//use express router
//any request came then requir index.routes 

app.use('/',require('./routes'));


// here we are told the sever to view the ejs file 
//setting  middleware to setup our view engine

app.set('view engine','ejs');
app.set('views','./views');


app.listen(port,function(err){
    if(err){
        console.log(`error in running on server: ${err}`);
    }
    console.log(`server is running on port : ${port}`);
});