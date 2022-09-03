const Post=require('../models/post');

const Comment=require('../models/comment');
module.exports.create=function(req,res){
    Post.create({
        content:req.body.content,
        user:req.user._id
    },function(err,post){
        if(err){console.log('error in creating a post');return;}
        return res.redirect('back');
    });
}

// deleting a post

module.exports.destroy=function(req,res){
    // we are using this destroy in routes posts

    // when we are searching on db then we need to use param because param search for url and we need the find the url
    Post.findById(req.params.id,function(err,post){
        // here we are checking the person who delete the post is user or not 
        // here user is id we are written in model post user type is ObjectId it's return the string id
        // here we simply write .id because we need to campare with string and .id gives us string
        // .id means converting the object id into String
        if(post.user==req.user.id){
            post.remove();
            // here we also need to delete the comment but at first we need to import the comment 
            // deleteMany delete all the comment based on query passed

            Comment.deleteMany({post:req.params.id},function(err){
                if(err){
                    console.log('error in delete comment');
                    return;
                }
                return res.redirect('back');
            });

        }else{
            // if user is not found
            return res.redirect('back');
        }
    })
}