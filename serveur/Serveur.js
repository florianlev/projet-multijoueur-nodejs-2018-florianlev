var http = require('http');
var io = require('socket.io');
Joueur = require('./Joueur.js');

var nombreClients;
var listeConnexion = [];
var listeJoueur = [];
var listeJoueurRestantDansLaPartie = [];
var joueurRestant;
var socket;
var debutPartie;
var partieEstCommencer;

function initialiser() {
    console.log("initialiser()");
    debutPartie = false;
    nombreClients = 0;
    joueurRestant = 0;
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
    joueurRestant++;
    console.log("ID client : " + connexion.id);

    listeConnexion[connexion.id] = connexion;

    var joueur = new Joueur(connexion.id);

    listeJoueur[connexion.id] = joueur;
    listeJoueurRestantDansLaPartie[connexion.id] = joueur;

    for (idConnexion = 0; idConnexion < listeConnexion.length; idConnexion++) {
        if (listeConnexion[idConnexion]) {
            listeJoueurJSON = recupererListeJoueurJSON();
            listeConnexion[idConnexion].emit('connexionJoueur', listeJoueurJSON);
        }
    }

    console.log("nombreJoueur" + nombreClients);

    connexion.on('toucheEnfoncee', gererToucheEnfoncee);
    connexion.on('joueurMort', gererMortDunJoueur);
    connexion.on('disconnect', gererDeconnexionClient);
    connexion.on('etatConnexion', recevoirEtatConnexion);
    connexion.on('joueurEstPret', gererDebut);
    connexion.on('joueurGagner', gererJoueurGagner);
}

function gererJoueurGagner(joueurGagnant)
{
    console.log("gererJoueurGagner()");
    listeJoueur[this.id].maxVitesse = 0;
}

function gererMortDunJoueur(unJoueur) {
    console.log('gererMortDunJoueur()');
    joueurRestant--;
    for (idJoueur in listeJoueurRestantDansLaPartie) {

        if (listeJoueurRestantDansLaPartie[idJoueur].id == listeJoueur[unJoueur.id].id) {
            //console.log("if(listeJoueurRestantDansLaPartie[idJoueur].id == listeJoueur[unJoueur.id])");
           // console.log(listeJoueurRestantDansLaPartie[idJoueur].id);
            delete listeJoueurRestantDansLaPartie[idJoueur];
        }

        if (listeJoueurRestantDansLaPartie[idJoueur]) {
            if (joueurRestant == 1) {
                console.log("JOUEUR RESTANT 1 ");
                for (var idConnexion in listeConnexion) {
                    listeConnexion[idConnexion].emit('joueurGagnant', listeJoueurRestantDansLaPartie[idJoueur]);
                }
            }
        }
    }

    //console.log(listeJoueurRestantDansLaPartie);
    listeJoueur[unJoueur.id].etatVieCourant = listeJoueur[unJoueur.id].etatVie.mort;

    console.log("joueurRestant : " + joueurRestant);
    console.log("listeJoueurRestantDansLaPartie");
    listeJoueur[unJoueur.id].maxVitesse = 0;

    console.log("JOUEUR MORT : ");
    console.log(listeJoueur[unJoueur.id].id);
    for (var idConnexion in listeConnexion) {
        listeConnexion[idConnexion].emit('mortDunJoueur', listeJoueur[unJoueur.id]);
    }

    console.log("listeJoueurRestantDansLaPartie" + listeJoueurRestantDansLaPartie.length);

}


function gererDebut(evenement) {
    console.log("Un joueur est pret a jouer!");
    listeConnexion[this.id].emit('positionInitiale', { x: joueur.x, y: joueur.y });


    console.log(evenement);
    if (nombreClients >= 2 && evenement) {
        console.log("debut");
        debutPartie = true;
        setVitesseListeJoueur(1);
        partieEstCommencer = true;
        for (var idConnexion in listeConnexion) {

            listeConnexion[idConnexion].emit('partieEstCommencer', partieEstCommencer);
        }
    }
}

function setVitesseListeJoueur(vitesse) {
    console.log("setVitesse");
    for (var idJoueur in listeJoueur) {
        console.log(listeJoueur[idJoueur].id);
        listeJoueur[idJoueur].maxVitesse = vitesse;
    }
}

function recevoirEtatConnexion(estConnecter) {
    listeJoueur[this.id].estCreer = estConnecter;
}

function gererDeconnexionClient(evenement) {
    console.log("gererDeconnexion" + this.id);
    var joueurDeconnecter = listeJoueur[this.id];
    listeConnexion[this.id].emit('logout', joueurDeconnecter);
    delete listeConnexion[this.id];
    delete listeJoueur[this.id];
}

function gererToucheEnfoncee(evenement) {

    listeJoueur[this.id].etatDirectionCourant = evenement.directionCourante;

}
function recupererListeJoueurJSON() {
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

    for (var idConnexion in listeConnexion) {
        if (listeConnexion[idConnexion]) {
            listeConnexion[idConnexion].emit('nouvellesPositions', listeJoueursJson);
        }
    }
}

initialiser();