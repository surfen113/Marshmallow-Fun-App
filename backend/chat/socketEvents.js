/**
 * Created by Thomas Stohl on 15.07.2017.
 */

exports = module.exports = function(io) {
    // Set socket.io listeners.
    io.on('connection', (socket) => {
        console.log('a user connected');

        // On conversation entry, join broadcast channel
        socket.on('enter conversation', (conversationId) => {
            socket.join(conversationId);
            console.log('joined ' + conversationId);
        });

        socket.on('leave conversation', (conversationId) => {
            socket.leave(conversationId);
            console.log('left ' + conversationId);
        })

        socket.on('new message', (conversation) => {
            io.sockets.in(conversation.conversationId).emit('refresh messages', conversation);
            console.log("new message " + JSON.stringify(conversation));
            console.log("new message send to conversation" + conversation.conversationId);
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
};

