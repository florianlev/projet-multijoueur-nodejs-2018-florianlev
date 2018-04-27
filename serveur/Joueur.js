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
    this.estCreer;
    this.etatDirectionCourant;

    const etatDirection = {
        droite : "droite",
        gauche : "gauche",
        haut : "haut",
        bas : "bas"
    }


    function initialiser(){
        console.log("initialiser");
        joueur.x = 0;
        joueur.y = 0;
        /* joueur.pressGauche = false;
        joueur.pressDroite = false;
        joueur.pressHaut = false;
        joueur.pressBas = false; */
        joueur.etatDirectionCourant = etatDirection.bas;
        joueur.maxVitesse = 20;
        joueur.id = nouveauId;
        joueur.estCreer = false;
    }

    this.mettreAjourPosition = function () {
        console.log("test");
        if (etatDirection.droite == joueur.etatDirectionCourant ) joueur.x += joueur.maxVitesse;
        if (etatDirection.gauche == joueur.etatDirectionCourant)  joueur.x -= joueur.maxVitesse;
        if (etatDirection.haut == joueur.etatDirectionCourant) joueur.y -= joueur.maxVitesse;
        if (etatDirection.bas == joueur.etatDirectionCourant) joueur.y += joueur.maxVitesse;
    }

    initialiser();

}
module.exports = Joueur;
