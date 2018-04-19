var http = require('http');
var io = require('socket.io');
Joueur = require('./Joueur.js');

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

    for (idConnexion = 0; idConnexion < SOCKET_LIST.length; idConnexion++) {
        if (SOCKET_LIST[idConnexion]) {
            SOCKET_LIST[idConnexion].emit('connexionJoueur', connexion.id);
        }
    }

    connexion.on('disconnect', gererDeconnexionClient);
    connexion.on('toucheEnfoncee', gererToucheEnfoncee);
}



function gererDeconnexionClient(evenement) {
    console.log("gererDeconnexion" + this.id);
    delete SOCKET_LIST[this.id];
    delete PLAYER_LIST[this.id];
}

function gererToucheEnfoncee(evenement) {
    switch (evenement.directionCourante) {
        case 'gauche':
            PLAYER_LIST[this.id].pressGauche = evenement.etatCourant;
            break;
        case 'droite':
            PLAYER_LIST[this.id].pressDroite = evenement.etatCourant;
            break;
        case 'haut':
            PLAYER_LIST[this.id].pressHaut = evenement.etatCourant;
            break;
        case 'bas':
            PLAYER_LIST[this.id].pressBas = evenement.etatCourant;
            break;
    }
}

function mettreAJourPosition() {
    for (var idJoueur in PLAYER_LIST) {
        PLAYER_LIST[idJoueur].mettreAjourPosition();
    }

    var listeJoueursJson = JSON.stringify(PLAYER_LIST);
    for (var idConnexion in SOCKET_LIST) {
        var connexion = SOCKET_LIST[idConnexion];
        connexion.emit('nouvellesPositions', listeJoueursJson);
    }
}

initialiser();