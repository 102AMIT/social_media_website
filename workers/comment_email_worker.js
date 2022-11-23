const queue=require('../config/kue');

const commentsMailer=require('../mailers/comments_mailer');

queue.process('emails', function(job,done){
    
    console.log('emails worker is processing a job',job.data);

    // we are calling the function from comments mailer in mailers folder where we are passing commant into that
    // this is also use in comments controllers
    commentsMailer.newComment(job.data);
    done();
});