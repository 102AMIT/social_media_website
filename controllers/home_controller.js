module.exports.home=function(req,res){

    return res.render('home',{
        title:"Home"
    })

    //this is diretly showing to the brower
    // return res.end('<h1>Express is up for codieal</h1>');
}