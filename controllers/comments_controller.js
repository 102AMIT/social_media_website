//here we are creating controller for comment model so we need to require fiest
const Comment=require('../models/comment');

// we also need to require post because when we comment then the comment refer to which post we know that time
const Post=require('../models/post');
module.exports.create=function(req,res){
    // this post is a id we are declare in home.ejs by this id we are track the post
    Post.findById(req.body.post,function(err,post){
        if(post){
            // if we find the post then we need to create this comment
            Comment.create({
                // here content is define in home.ejs in input tag name so that store the value for us
                // here left side content,post and user is define in models comment.js and right side are define in home.ejs in name attribute

                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            },function(err, comment){
                if(err){
                    console.log('Error to create comment');
                    return;
                }
                // if the comment is created then we need to add the comment in post
                // here comment is push to post push function is provided my mongo db

                // here we are pushing the comment in post comment in models of post their we are creting the array of comments

                post.comments.push(comment);
                // save is also predifine function
                post.save();
                res.redirect('/');
                // now we are creating a comment now we need to go to routes

            });
        }
    });

}

// here i'm  deleting a comment by serching id by params 

module.exports.destroy=function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(comment.user == req.user.id){
            //before deleting we need to fetch id of comment and find the comment from the array and delete it

        }
    })
}

