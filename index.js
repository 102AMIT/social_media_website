const express=require('express');
// npm install cookie-parser is command
const cookieParser=require('cookie-parser');
// then we need to tell the app to use it in middleware the home controller

const port=8001;
const app=express();
//we are now intalling the layout ejs library and create a folder on views of layout.ejs
//terminal command for install the layout library is : npm install express-ejs-layouts
// here we are reqiure the lauout library
const expressLayouts=require('express-ejs-layouts');
//here we require mongoose
const db=require('./config/mongoose');

// here we are create session for authontication we alredy create our authontication 
// for this session we need to install : npm install express-session
// used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');

// we are installing mongo connect : npm install connect-mongo
// why we install mongo connect because when we restart our server then every time our cookies is reset 
const MongoStore=require('connect-mongo');



// we are working on sass and scss
// for that we need to install sass middleware : npm install node-sass-middleware
// now we need to require the sass
const sassMiddleware=require('node-sass-middleware');

app.use(sassMiddleware({

    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));




// we need to tell reading through the post request of cookie

app.use(express.urlencoded());
app.use(cookieParser());//set cookies via browser : we are going to console then application tab then we see where are our cookie are stored

//we are using asset file here by giving the folder address
app.use(express.static('./assets'));

// we need to tell the app to use it
// we need to put before our routes in the routes the views and going to be render before that we need to tell all the views are goinf to be render belong to some sort of layout or a function which can define which layout is use 
app.use(expressLayouts);

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// here we are told the sever to view the ejs file 
//setting  middleware to setup our view engine

app.set('view engine','ejs');
app.set('views','./views');


// here we also use mongo store for store or save the cookies if our server is restarted then we don't loose the cookies
// **********dont under stand this part************
app.use(session({
    // name of the id of cookie
    name:'codeial',
    // TODO change the secret before deployment in production mode
    // here secret is the key and blahsomething is it's value for every id
    secret: 'blahsomething',
    saveUninitialized:false,
    resave:false,
    // here we set the time for cookie .when till cookie is valid like : otp 
    //calculate in miliSecond
    cookie:{
    maxAge:(1000*60*100)
    },//define another key over here for mongoconnect
    store: MongoStore.create(
        {
           mongoUrl:'mongodb://localhost:27017/codeial_development',
           autoRemove:'disabled'
        },
        function(err){
            console.log(err || 'connect mongo db cookies  setup ok');
        }
    )

        
}));

app.use(passport.initialize());
// passport also maintaining the session so this is the function
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
// after that we need to go to the user controller

    
//use express router
//any request came then requir index.routes 

app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`error in running on server: ${err}`);
    }
    console.log(`server is running on port : ${port}`);
});