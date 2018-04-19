var http = require('http');
var io = require('socket.io');
Joueur = require('./Joueur.js');

var nombreClients;
var listeConnexion = [];
var listeJoueur = [];
var listeJoueur = [];



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

    listeConnexion[connexion.id] = connexion;

    var joueur = new Joueur(connexion.id);

    listeJoueur[connexion.id] = joueur;

    for (idConnexion = 0; idConnexion < listeConnexion.length; idConnexion++) {
        if (listeConnexion[idConnexion]) {
            listeJoueurJSON = recupererListeJoueurJSON();
            console.log(listeJoueurJSON);
            listeConnexion[idConnexion].emit('connexionJoueur', listeJoueurJSON);
        }
    }
    connexion.on('disconnect', gererDeconnexionClient);
    connexion.on('toucheEnfoncee', gererToucheEnfoncee);
}

function gererDeconnexionClient(evenement) {
    console.log("gererDeconnexion" + this.id);
    delete listeConnexion[this.id];
    delete listeJoueur[this.id];
}

function gererToucheEnfoncee(evenement) {
    switch (evenement.directionCourante) {
        case 'gauche':
            listeJoueur[this.id].pressGauche = evenement.etatCourant;
            break;
        case 'droite':
            listeJoueur[this.id].pressDroite = evenement.etatCourant;
            break;
        case 'haut':
            listeJoueur[this.id].pressHaut = evenement.etatCourant;
            break;
        case 'bas':
            listeJoueur[this.id].pressBas = evenement.etatCourant;
            break;
    }
}

function recupererListeJoueurJSON()
{
    var listeJoueurActif = [];
    for (var idJoueur in listeJoueur) {
        if (listeJoueur[idJoueur]) 
            listeJoueurActif.push(listeJoueur[idJoueur]);     
    }
    return JSON.stringify(listeJoueurActif);

}

function mettreAJourPosition() {
    var listeJoueurActif = [];
    for (var idJoueur in listeJoueur) {
        if (listeJoueur[idJoueur]) {
            joueur = listeJoueur[idJoueur];
            joueur.mettreAjourPosition();
            listeJoueurActif.push(joueur);     
        }
    }
    var listeJoueursJson = JSON.stringify(listeJoueurActif);
   
    //console.log(listeJoueursJson);
    for (var idConnexion in listeConnexion) {
        if (listeConnexion[idConnexion]) {
            listeConnexion[idConnexion].emit('nouvellesPositions', listeJoueursJson);
        }
    }
}

initialiser();