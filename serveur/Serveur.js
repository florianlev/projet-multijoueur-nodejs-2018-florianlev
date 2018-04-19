var http = require('http');
var io = require('socket.io');
Joueur = require('/Joueur.js');

var nombreClients;
var SOCKET_LIST = [];
var PLAYER_LIST = [];


function initialiser() {
    console.log("initialiser()");
    nombreClients = 0;
    var server = http.createServer(function (req, res) {
        // Send HTML headers and message
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Hello Socket Lover!</h1>');
    });

    server.listen(2000)

    var socket = io.listen(server);

    socket.on('connection', gererConnexion);

    setInterval(mettreAJourPosition, 1000 / 25);
}

console.log("Server started");



function gererConnexion(connexion) {
    nombreClients++;
    connexion.id = nombreClients;
    console.log("ID client : " + connexion.id);

    SOCKET_LIST[connexion.id] = connexion;

    var joueur = new Joueur(connexion.id);

    PLAYER_LIST[connexion.id] = joueur;

    for(idConnexion=0; idConnexion < SOCKET_LIST.length; idConnexion++)
    {
        if(SOCKET_LIST[idConnexion])
        {
            SOCKET_LIST[idConnexion].emit('connexionJoueur', connexion.id);
        }
    }

    connexion.on('disconnect', gererDeconnexionClient);
    connexion.on('toucheEnfoncee', gererToucheEnfoncee);
}



function gererDeconnexionClient(evenement)
{
    delete SOCKET_LIST[connexion.id];
    delete PLAYER_LIST[connexion.id];
}

function gererToucheEnfoncee(evenement)
{
    switch (evenement.inputId) {
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
}

function mettreAJourPosition() {

    var pack = [];
    for (var i in PLAYER_LIST) {
        var player = PLAYER_LIST[i];
        joueur.mettreAjourPosition();
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