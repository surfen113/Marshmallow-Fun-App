var Config = require('./config/config');
var app = require('./app');

/**
 * Start the server
  */
console.log("Server is listening on port %s", Config.app.port);
server = app.listen(Config.app.port);

socketEvents = require('./chat/socketEvents');
const io = require('socket.io').listen(server);
socketEvents(io);









