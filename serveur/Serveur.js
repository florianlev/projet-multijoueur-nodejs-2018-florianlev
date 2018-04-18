//var express = require('express');
//var app = express();
var http = require('http');
var io = require('socket.io');


var server = http.createServer(function(req, res){ 
    // Send HTML headers and message
    res.writeHead(200,{ 'Content-Type': 'text/html' }); 
    res.end('<h1>Hello Socket Lover!</h1>');
});
server.listen(2000)

var socket = io.listen(server);

//http.listen(2000);
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

//var io = require('socket.io')(http, {});


socket.on('connection', function (client) {

    console.log("test");
    client.id = Math.random();
    SOCKET_LIST[client.id] = client;

    var player = Player(client.id);
    PLAYER_LIST[client.id] = player;

    client.on('disconnect', function () {
        delete SOCKET_LIST[client.id];
        delete PLAYER_LIST[client.id];
    });

    client.on('toucheEnfoncee', function (data) {
        if (data.inputId === 'gauche')
            player.pressGauche = data.state;
        else if (data.inputId === 'droite')
            player.pressDroite = data.state;
        else if (data.inputId === 'haut')
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
        var clients = SOCKET_LIST[i];
        clients.emit('newPositions', pack);
    }


}, 1000 / 25);