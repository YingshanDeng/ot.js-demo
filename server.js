var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use('/ot.js', express.static('ot.js'));
app.use('/node_modules', express.static('node_modules'));

http.listen(3000, function(){
  console.log('listening on *:3000');
});

var EditorSocketIOServer = require('./ot.js/editor-socketio-server.js');
var server = new EditorSocketIOServer("", [], 1);

io.on('connection', function(socket) {
  server.addClient(socket);
});
