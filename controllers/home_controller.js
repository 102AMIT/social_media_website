module.exports.home=function(req,res){
    // here we get the cookies from brower we need to set first 
    // first we need to go to console then application then cookies then the expend it click on url and set the name as id and value according to that id 
    // then we console here so name or id and value are printed when we refresh the browser according to that we get the value and id here 
    // cookies coming with req and going back in res 
    
    console.log(req.cookies);

    // here we change the cookies
    // this is change via response as you can see below by providing id and value 
    res.cookie('user_id',25);//repalce the value for specific id

    return res.render('home',{
        title:"Home"
    })

    //this is diretly showing to the brower
    // return res.end('<h1>Express is up for codieal</h1>');
}