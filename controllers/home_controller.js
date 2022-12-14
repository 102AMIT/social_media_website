const Post = require('../models/post');
const User = require('../models/user');


module.exports.home = async function (req, res) {

    // here we are using populate populate is use for populating data we want populate is mongoose property
    // exec is a call back function
    // populate the user for each post
    // after this we got the whole user obaject we want to display the name with the help of ejs

    try {
        // CHANGE :: populate the likes of each post and comment
        let posts = await Post.find({})
            // sort for create post when we create a new post it's shown on top
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                },
                // populate:{
                //     path:'likes'
                // }
                populate: [
                    'user', 'likes'
                ]
            }).populate('likes');

        let users = await User.find({});

        return res.render('home', {
            title: "Codial | Home",
            posts: posts,
            all_users: users
        });
        // return res.json(200,{
        //     posts : posts,
        //     all_users:users
        // })
    }
    catch (err) {
        console.log('Error', err);
        return;
    }
}
