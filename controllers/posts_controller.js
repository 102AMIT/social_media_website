const Post=require('../models/post');

const Comment=require('../models/comment');
module.exports.create=async function(req,res){
    try{
    let post =await Post.create({
        content:req.body.content,
        user:req.user._id
    });

    // here we need to check this is AJAX request the type of AJAX request is XMLHttps request
    if(req.xhr){
        return res.status(200).json({
            data:{
                post:post
            },
            message:"Post created !"
        });

        
    }

    req.flash('success','Post Published !');
    return res.redirect('back');
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }


}

// deleting a post

module.exports.destroy=async function(req,res){
    // we are using this destroy in routes posts

    try{
        // when we are searching on db then we need to use param because param search for url and we need the find the url
    let post=await Post.findById(req.params.id);

    // here we are checking the person who delete the post is user or not 
        // here user is id we are written in model post user type is ObjectId it's return the string id
        // here we simply write .id because we need to campare with string and .id gives us string
        // .id means converting the object id into String
        if(post.user==req.user.id){
            post.remove();
            // here we also need to delete the comment but at first we need to import the comment 
            // deleteMany delete all the comment based on query passed

            await Comment.deleteMany({post:req.params.id});
                req.flash('success','Post and associated comments deleted !');
                return res.redirect('back');
        }else{
            // if user is not found
            req.flash('error','You cannot delete this post !');
            return res.redirect('back');
        }

    }catch{
        req.flash('error',err);
        return res.redirect('back');
    }  
}