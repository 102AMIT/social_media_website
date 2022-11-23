//here we are creating controller for comment model so we need to require fiest
const Comment=require('../models/comment');

// we also need to require post because when we comment then the comment refer to which post we know that time
const Post=require('../models/post');

// import mailer for sending mail when comment is created
const commentsMailer=require('../mailers/comments_mailer');

// require kue

const queue=require('../config/kue');

// require comment email worker

const commentEmailWorker=require('../workers/comment_email_worker');

// we are implementing here async await function
module.exports.create= async function(req,res){
    // this post is a id we are declare in home.ejs by this id we are track the post
    try{
        let post=await Post.findById(req.body.post);
            if(post){
                // if we find the post then we need to create this comment
                let comment= await Comment.create({
                    // here content is define in home.ejs in input tag name so that store the value for us
                    // here left side content,post and user is define in models comment.js and right side are define in home.ejs in name attribute
    
                    content:req.body.content,
                    post:req.body.post,
                    user:req.user._id
                });
                    // if the comment is created then we need to add the comment in post
                    // here comment is push to post push function is provided my mongo db
    
                    // here we are pushing the comment in post comment in models of post their we are creting the array of comments
    
                    post.comments.push(comment);
                    // save is also predifine function
                    post.save();



                    comment=await comment.populate('user','name email ');
                    console.log(comment);
                    // here we are passing the comments in node mailer
                    // commentsMailer.newComment(comment);


                    // here we are passing the comments in queue of email workers

                    // here we are using save beacuse we are put in into data base
                    let job=queue.create('emails',comment).save(function(err){
                        if(err){
                            console.log('error in creating a queue',err);
                        }
                        console.log("job.id",job.id);
                    });


                    if(req.xhr){
                        
                        return res.status(200).json({
                            data:{
                                comment:comment
                            },
                            message:"Comment created !"
                        });
                    }
                    req.flash('success','Comment published');

                    res.redirect('/');
                    // now we are creating a comment now we need to go to routes
    
                }

    }catch(err){
        console.log('Error',err);
        return;
    }
    
}

// here i'm  deleting a comment by serching id by params 

module.exports.destroy= async function(req,res){

    try{
        let comment= await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            //before deleting we need to fetch id of comment and find the comment from the array and delete it
            let postId=comment.post;
            comment.remove();
            // here we are using pull function it's predefine
            // here comments is array we are creting in model post and here it's store the id from req.params,id
           let post= Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});
                return res.redirect('back');
            
        }else{
            return res.redirect('back');
        }

    }catch{
        console.log('Error',err);
        return;
    }
}

