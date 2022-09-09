const mongoose=require('mongoose');
// import multer for upload differnt file
const multer=require('multer');
// we also need to require path for file upload
const path=require('path');
// defining path
const AVATAR_PATH=path.join('/uploads/users/avatars');


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
    avatar:{
        type:String,

    }
},{
    //time stamps is for create at and updated at 
    timestamps:true
});


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });

//   Static methods
// .single says only one file uploaded for filed name avatar
userSchema.statics.uploadedAvatar=multer({storage: storage}).single('avatar');
// here we are made avartar path publically
userSchema.statics.avatarPath=AVATAR_PATH;


const User=mongoose.model('User',userSchema);

module.exports=User;