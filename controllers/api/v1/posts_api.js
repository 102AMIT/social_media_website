const Post=require('../../../models/post');
const Comment=require('../../../models/comment');

module.exports.index= async function(req,res){

    let posts= await Post.find({})
    // sort for create post when we create a new post it's shown on top
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });


    return res.json(200,{
        message:"List of posts",
        posts:posts
    })
}


module.exports.destroy=async function(req,res){
    // we are using this destroy in routes posts

    try{
         let post=await Post.findById(req.params.id);

        if(post.user==req.user.id){
            post.remove();

            await Comment.deleteMany({post:req.params.id});
            
                return res.json(200,{
                    message:"Post and associated comments deleted successfully"
                });
        }else{
            // if user is not found
            return res.json(401,{
                message: "You cannot delete this post"
            })
        }

    }catch(err){
        console.log('error',err);
        return res.json(500,{
            message:"Internal server error"
        });
    }  
}