var http = require('http');
var io = require('socket.io');
var nombreClients;
var SOCKET_LIST = {};
var PLAYER_LIST = {};


function initialiser() {
    nombreClients = 0;
    var server = http.createServer(function (req, res) {
        // Send HTML headers and message
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Hello Socket Lover!</h1>');
    });

    server.listen(2000)

    var socket = io.listen(server);
    socket.on('connexion', gererConnexion);



    setInterval(mettreAJourPosition, 1000 / 25);
}



console.log("Server started");



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


function gererConnexion(client) {
    nombreClients++;
    client.id = nombreClients;
    console.log("ID client : " + client.id);

    SOCKET_LIST[client.id] = client;

    var player = Player(client.id);
    PLAYER_LIST[client.id] = player;


    client.emit('connexionDunJoueur', client.id);

    client.on('disconnect', function () {
        delete SOCKET_LIST[client.id];
        delete PLAYER_LIST[client.id];
    });

    client.on('toucheEnfoncee', function (evenement) {

        switch (data.inputId) {
            case 'gauche':
                player.pressGauche = evenement.state;
                break;
            case 'droite':
                player.pressDroite = evenement.state;
                break;
            case 'haut':
                player.pressHaut = evenement.state;
                break;
            case 'bas':
                player.pressBas = evenement.state;
                break;
        }
    });

}

function mettreAJourPosition() {

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
        clients.emit('nouvellesPositions', pack);
    }


}

initialiser();