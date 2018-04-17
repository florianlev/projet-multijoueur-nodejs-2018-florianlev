var express = require('express');
var app = express();
var http = require('http').Server(app);

app.get('/', function(req,res)
{
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));

http.listen(2000);
console.log("Server started");

var io = require('socket.io')(http,{});
io.sockets.on('connection', function(socket)
{
    console.log('socket connection');

    socket.on('happy', function(data){
        console.log('happy because ' + data.reason);
    });

    socket.emit('serveurMsg',{
        msg:'hello',
    });
});