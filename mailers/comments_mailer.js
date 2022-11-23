const nodeMailer=require('../config/nodemailer');

// this is another way of exporting a method
exports.newComment=(comment)=>{
    console.log('inside newComment mailer',comment);
    // send mail is pre defined function 
    nodeMailer.transporter.sendMail({
        from:'test12349830@gmail.com',
        to:comment.user.email,
        subject:"New Comment Publish",
        html:'<h1>Your comment is now Published</h1>'
    },(err,info)=>{
        if(err){console.log("Error in sending mail",err);return;}

        console.log('Message sent',info);
        return;
    });
}

// after that we need to go to comment controller where comment is created.