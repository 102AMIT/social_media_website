const Post=require('../models/post');

const Comment=require('../models/comment');

const Like=require('../models/like');

module.exports.create=async function(req,res){
    try{
    let post =await Post.create({content:req.body.content , user:req.user._id});

    // here we need to check this is AJAX request the type of AJAX request is XMLHttps request

    if(req.xhr){

        // if we want to populate just the name of the user (we will not want to send the password in the api ),this is how we do it!

        post =await post.populate('user','name');
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
        // added this to view the error on console as well 
        console.log(err);
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
        if(post.user == req.user.id){

            // Change :: delete the associated likes for the post and all it's comments likes too
            // likes deleted on post 
            await Like.deleteMany({likeable:post,onModel:'Post'});
            // likes deleted on comments on this  post
            await Like.deleteMany({_id:{$in:post.comments}});



            post.remove();
            // here we also need to delete the comment but at first we need to import the comment 
            // deleteMany delete all the comment based on query passed

            await Comment.deleteMany({post:req.params.id});
                // for deleting the post using ajax

                if(req.xhr){
                    return res.status(200).json({
                        data:{
                            post_id:req.params.id
                        },
                        message:"Post deleted"
                    })
                }

                req.flash('success','Post and associated comments deleted !');
                return res.redirect('back');
        }else{
            // if user is not found
            req.flash('error','You cannot delete this post !');
            return res.redirect('back');
        }

    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }  
}