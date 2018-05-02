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
        joueur.x = entierAleatoire(0,1500);
        joueur.y = entierAleatoire(0,1500);
        joueur.etatDirectionCourant = etatDirection.bas;
        joueur.maxVitesse = 10;
        joueur.id = nouveauId;
        joueur.estCreer = false;
    }

    this.mettreAjourPosition = function () {
        if (etatDirection.droite == joueur.etatDirectionCourant ) joueur.x += joueur.maxVitesse;
        if (etatDirection.gauche == joueur.etatDirectionCourant)  joueur.x -= joueur.maxVitesse;
        if (etatDirection.haut == joueur.etatDirectionCourant) joueur.y -= joueur.maxVitesse;
        if (etatDirection.bas == joueur.etatDirectionCourant) joueur.y += joueur.maxVitesse;
    }

    function entierAleatoire(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    initialiser();

}
module.exports = Joueur;
