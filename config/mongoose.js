//npm install mongoose

const mongoose=require('mongoose');

const env=require('./environment');

mongoose.connect(`mongodb://localhost/${env.db}`);
// mongoose.connect('mongodb://loc')

const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error is conecting to MongoDB"));

db.once('open',function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports=db;