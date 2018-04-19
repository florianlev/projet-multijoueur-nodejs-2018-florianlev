function Joueur(id) {


    var x;
    var y;
    var pressGauche;
    var pressDroite;
    var pressHaut;
    var pressBas;
    var maxVitesse;


    var initialiser = function () {
        x = 250;
        y = 250;
        pressGauche = false;
        pressDroite = false;
        pressHaut = false;
        pressBas = false;
        maxVitesse = 10;
    }

    this.mettreAjourPosition = function () {
        if (pressDroite) x += maxVitesse;
        if (pressGauche)  x -= maxVitesse;
        if (pressHaut) y -= maxVitesse;
        if (pressBas) y += maxVitesse;
    }

}
module.exports = Joueur;
