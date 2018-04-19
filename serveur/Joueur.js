function Joueur(nouveauId) {
    joueur = this;
    this.id;
    this.x;
    this.y;
    this.pressGauche;
    this.pressDroite;
    this.pressHaut;
    this.pressBas;
    this.maxVitesse;


    function initialiser(){
        console.log("initialiser");
        joueur.x = 250;
        joueur.y = 250;
        joueur.pressGauche = false;
        joueur.pressDroite = false;
        joueur.pressHaut = false;
        joueur.pressBas = false;
        joueur.maxVitesse = 10;
        joueur.id = nouveauId;
    }

    this.mettreAjourPosition = function () {
        if (joueur.pressDroite) joueur.x += joueur.maxVitesse;
        if (joueur.pressGauche)  joueur.x -= joueur.maxVitesse;
        if (joueur.pressHaut) joueur.y -= joueur.maxVitesse;
        if (joueur.pressBas) joueur.y += joueur.maxVitesse;
    }

    initialiser();

}
module.exports = Joueur;
