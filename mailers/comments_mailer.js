const nodeMailer=require('../config/nodemailer');

// this is another way of exporting a method
exports.newComment=(comment)=>{
    // for storing and set the Html part we need to render this
    let htmlString =nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');

    // console.log('inside newComment mailer',comment);
    // send mail is pre defined function 
    nodeMailer.transporter.sendMail({
        from:'test12349830@gmail.com',
        to:comment.user.email,
        subject:"New Comment Publish",
        html:htmlString
    },(err,info)=>{
        if(err){console.log("Error in sending mail",err);return;}

        // console.log('Message sent',info);
        return;
    });
}

// after that we need to go to comment controller where comment is created.