//here profile is Action to link with router of user profile
module.exports.profile=function(req,res){

    return res.render('user_profile',{
        title:"Home"
    });
}
//this controller is ready to access by a router
