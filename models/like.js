const mongoose=require('mongoose');

const likeSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId
    },
    // this define the object id of the liked object
    likeable:{
        type:mongoose.Schema.ObjectId,
        required:true,
        refPath:'onModel'
    },
    // this field is used for defining the type of the liked object sincethis is a dynamic reference
    onModel:{
        type:String,
        required:true,
        // enum model means each like either post and comment nothing other than that
        // this define only two model contains like, post and comment 
        enum:['Post','Comment']
    }
},{
    timestamps:true
});

const Like=mongoose.model('Like',likeSchema);

module.exports=Like;