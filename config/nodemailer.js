const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');


// we are using here SMPT (Simple Mail Transfer Protocol)....
// here we are define transporter this is the part who send emails go through the doc of nodemailer
// it's also define how communication take place

// first of all activate 2 auth in gamil and generate a 16 digit password 
let transporter=nodemailer.createTransport({
    service:'gamil',
    host:'smtp.gmail.com',
    port:465, //here we need to use port 465 
    secure:true,
//    this auth is a sender of mail to user how commented
    auth:{
        user:'test12349830@gmail.com',   //here is my mail 
        pass:'bjakjlivnsszhdxm'          //here is my password
    },
    
});

// renderTemplate is rendering our Html which simple means that when we are going to send HTML email where are file will be placed in views/mailer folder
let renderTemplate=(data,relativePath)=>{
    let mailHtml;
    ejs.renderFile(
        // RELATIVE path means from where this function is called 
        path.join(__dirname,'../views/mailers',relativePath),data,function(err,template){
            if(err){console.log('error in rendering template',err);return};

            mailHtml=template;
        }
    )
    return mailHtml;
}
// we need to export both the property for use 
module.exports={transporter:transporter, renderTemplate:renderTemplate};