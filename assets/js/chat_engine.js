class ChatEngine {
    constructor(chatBoxId, userEmail) {
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        // io is a global varibale when we are include in the js from cdn in home.ejs that io came from there
        // var connectionOptions =  {
        //     "force new connection" : true,
        //     "reconnectionAttempts": "Infinity", 
        //     "timeout" : 10000,                  
        //     "transports" : ["websocket"]
        // };

        // this.socket = io.connect('http://localhost:5000',connectionOptions);
        this.socket = io.connect('http://localhost:5000');

        // this.socket=io.connect('http://localhost:5000', { transports: ['websocket'] });

        if (this.userEmail) {
            this.connectionHandler();
        }
    }
    // creating a connection handler
    connectionHandler() {
        let self = this;
        // this is event listener .on same we are using in db connection
        // when connect is happening this function is trigger
        this.socket.on('connect', function () {
            console.log('connection established using sokets....!')

            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codeial'
            });
            self.socket.on('user_joined', function (data) {
                console.log('a user joined', data);
            })

        });
        // send the message on clicking the send button 

        $('#send-message').click(function () {
            let msg = $('#chat-message-input').val();

            if (msg != '') {

                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                })
            }
        });

        self.socket.on('receive_message', function (data) {
            console.log("message received", data.message);

            let newMessage = $('<li>');

            let messageType = 'other-message';

            if (data.user_email == self.userEmail) {
                messageType = 'self-message';
            }
            newMessage.append($('<span>', {
                'html': data.message
            }));

            newMessage.append($('<sub>', {
                'html': data.user_email
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
        })

    }
}