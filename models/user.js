const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        //unique because we need to store unique email
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
},{
    //time stamps is for create at and updated at 
    timestamps:true
});
const User=mongoose.model('User',userSchema);

module.exports=User;