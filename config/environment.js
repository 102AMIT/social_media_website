const development = {
    name: 'development',
    // if you are using /assets then this not load your css for that you need to add ./assets
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        service: 'gamil',
        host: 'smtp.gmail.com',
        port: 465, //here we need to use port 465 
        secure: true,
        //this auth is a sender of mail to user how commented
        auth: {
            user: 'test12349830@gmail.com',   //here is my email 
            pass: 'bjakjlivnsszhdxm'          //here is my password
        },

    },
    google_client_id: "592798296013-gmdq5djqgmo063ohq3uvkraqsaimc5bh.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8001/users/auth/google/callback",
    jwt_secret: 'codeial',
}

const produnction = {
    name: 'production'
}

module.exports = development;