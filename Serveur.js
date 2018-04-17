var express = require('express');
var app = express();
var http = require('http').Server(app);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));

http.listen(2000);
console.log("Server started");

var SOCKET_LIST = {};
var PLAYER_LIST = {};

var Player = function (id) {
    var joueur = {
        x: 250,
        y: 250,
        id: id,
        number: "" + Math.floor(10 * Math.random()),
        pressGauche: false,
        pressDroite: false,
        pressHaut: false,
        pressBas: false,
        maxVitesse: 10,
    }
    joueur.updatePosition = function () {
        if (joueur.pressDroite)
            joueur.x += joueur.maxVitesse;
        if (joueur.pressGauche)
            joueur.x -= joueur.maxVitesse;
        if (joueur.pressHaut)
            joueur.y -= joueur.maxVitesse;
        if (joueur.pressBas)
            joueur.y += joueur.maxVitesse;
    }
    return joueur;
}

var io = require('socket.io')(http, {});


io.sockets.on('connection', function (socket) {
    socket.id = Math.random();
    SOCKET_LIST[socket.id] = socket;

    var player = Player(socket.id);
    PLAYER_LIST[socket.id] = player;

    socket.on('disconnect', function () {
        delete SOCKET_LIST[socket.id];
        delete PLAYER_LIST[socket.id];
    });

    socket.on('toucheEnfoncee', function (data) {
        if (data.inputId === 'gauche')
            player.pressGauche = data.state;
        else if (data.inputId === 'droite')
            player.pressDroite = data.state;
        else if (data.inputId === 'up')
            player.pressHaut = data.state;
        else if (data.inputId === 'bas')
            player.pressBas = data.state;

    });
});

setInterval(function () {
    var pack = [];
    for (var i in PLAYER_LIST) {
        var player = PLAYER_LIST[i];
        player.updatePosition();
        pack.push({
            x: player.x,
            y: player.y,
            number: player.number
        });
    }

    for (var i in SOCKET_LIST) {
        var socket = SOCKET_LIST[i];
        socket.emit('newPositions', pack);
    }


}, 1000 / 25);